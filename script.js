(function(){
  const firebaseConfig = {
    apiKey: "AIzaSyBAST4ycfLq7B5X673Irunv1-9BwGIrHlg",
    authDomain: "lumiencare.firebaseapp.com",
    projectId: "lumiencare",
    storageBucket: "lumiencare.firebasestorage.app",
    messagingSenderId: "1020126567561",
    appId: "1:1020126567561:web:64c38dde53182a1317ba58"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  const toggleBtn = document.getElementById('toggleReviewFormBtn');
  const formWrap = document.getElementById('reviewFormWrap');
  const form = document.getElementById('userReviewForm');
  const listEl = document.getElementById('userReviewList');
  const emptyEl = document.getElementById('urEmpty');
  const contentEl = document.getElementById('urContent');
  const countEl = document.getElementById('urCount');
  const starsWrap = document.getElementById('urStars');
  const photoInput = document.getElementById('urPhoto');
  const previewWrap = document.getElementById('urPreviewWrap');
  const previewImg = document.getElementById('urPreviewImg');
  const removePhotoBtn = document.getElementById('urRemovePhoto');
  const submitBtn = document.getElementById('urSubmitBtn');
  const msgEl = document.getElementById('urMsg');

  let rating = 5;
  let photoBase64 = null;

  Array.prototype.forEach.call(starsWrap.children, function(btn){
    btn.addEventListener('click', function(){
      rating = parseInt(btn.getAttribute('data-star'), 10);
      renderStars();
    });
  });
  function renderStars(){
    Array.prototype.forEach.call(starsWrap.children, function(btn){
      var v = parseInt(btn.getAttribute('data-star'), 10);
      btn.classList.toggle('active', v <= rating);
    });
  }
  renderStars();

  contentEl.addEventListener('input', function(){
    countEl.textContent = contentEl.value.length;
  });

  toggleBtn.addEventListener('click', function(){
    var isOpen = formWrap.style.display !== 'none';
    formWrap.style.display = isOpen ? 'none' : 'block';
    toggleBtn.textContent = isOpen ? '후기 작성하기' : '접기';
  });

  // 사진을 캔버스로 리사이즈 + 압축해서 base64로 변환 (Storage 없이 Firestore에 직접 저장)
  function compressImage(file, callback){
    var reader = new FileReader();
    reader.onload = function(e){
      var img = new Image();
      img.onload = function(){
        var maxW = 800;
        var scale = Math.min(1, maxW / img.width);
        var canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        callback(canvas.toDataURL('image/jpeg', 0.6));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  photoInput.addEventListener('change', function(){
    var file = photoInput.files[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      alert('원본 사진은 8MB 이하만 첨부 가능합니다.');
      photoInput.value = '';
      return;
    }
    compressImage(file, function(dataUrl){
      if (dataUrl.length > 700000) {
        alert('사진 용량이 다소 큽니다. 다른 사진으로 시도해 주세요.');
        photoInput.value = '';
        previewWrap.style.display = 'none';
        photoBase64 = null;
        return;
      }
      photoBase64 = dataUrl;
      previewImg.src = dataUrl;
      previewWrap.style.display = 'block';
    });
  });
  removePhotoBtn.addEventListener('click', function(){
    photoBase64 = null;
    photoInput.value = '';
    previewWrap.style.display = 'none';
  });

  function canSubmit(){
    var last = localStorage.getItem('lc_last_review_time');
    if (!last) return true;
    return (Date.now() - parseInt(last, 10)) > 60000;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    msgEl.textContent = '';

    var honeypot = document.getElementById('urWebsite').value;
    if (honeypot) { return; }

    if (!canSubmit()) {
      msgEl.textContent = '잠시 후 다시 시도해 주세요. (스팸 방지)';
      msgEl.style.color = '#c0392b';
      return;
    }

    var name = document.getElementById('urName').value.trim() || '익명';
    var area = document.getElementById('urArea').value.trim();
    var service = document.getElementById('urService').value;
    var content = contentEl.value.trim();

    if (!content) {
      msgEl.textContent = '후기 내용을 입력해 주세요.';
      msgEl.style.color = '#c0392b';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = '등록 중...';

    db.collection('reviews').add({
      name: name,
      area: area,
      service: service,
      rating: rating,
      content: content,
      photoBase64: photoBase64 || null,
      status: 'approved',
      website: honeypot,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function(){
      localStorage.setItem('lc_last_review_time', Date.now().toString());
      form.reset();
      photoBase64 = null;
      previewWrap.style.display = 'none';
      countEl.textContent = '0';
      rating = 5;
      renderStars();
      msgEl.style.color = '#2e7d32';
      msgEl.textContent = '소중한 후기 감사합니다! 등록되었습니다.';
      submitBtn.disabled = false;
      submitBtn.textContent = '후기 등록하기';
      loadReviews();
    }).catch(function(err){
      console.error(err);
      msgEl.style.color = '#c0392b';
      msgEl.textContent = '등록 중 오류가 발생했습니다. 다시 시도해 주세요.';
      submitBtn.disabled = false;
      submitBtn.textContent = '후기 등록하기';
    });
  });

  function loadReviews(){
    db.collection('reviews')
      .where('status', '==', 'approved')
      .orderBy('createdAt', 'desc')
      .limit(30)
      .get()
      .then(function(snap){
        listEl.innerHTML = '';
        if (snap.empty) {
          emptyEl.style.display = 'block';
          return;
        }
        emptyEl.style.display = 'none';
        snap.forEach(function(doc){
          listEl.appendChild(renderCard(doc.data()));
        });
      })
      .catch(function(err){ console.error(err); });
  }

  function renderCard(r){
    var card = document.createElement('div');
    card.className = 'review-card current';
    var stars = '';
    for (var i = 1; i <= 5; i++) {
      stars += '<span style="color:' + (i <= r.rating ? 'var(--tan)' : '#ddd') + '">★</span>';
    }
    var photoHtml = r.photoBase64 ? '<img src="' + r.photoBase64 + '" class="ur-card-photo" alt="후기 사진" />' : '';
    card.innerHTML =
      '<div class="flex gap-0.5">' + stars + '</div>' +
      photoHtml +
      '<p class="quote">' + escapeHtml(r.content) + '</p>' +
      '<div class="flex items-center justify-between pt-4 border-t" style="border-color:rgba(59,42,26,0.08)">' +
        '<div><p class="text-sm font-semibold">' + escapeHtml(r.name) + ' 님</p>' +
        '<p class="text-xs" style="color:var(--muted-text)">' + escapeHtml(r.area || '') + '</p></div>' +
        '<span class="review-service-tag">' + escapeHtml(r.service) + '</span>' +
      '</div>';
    return card;
  }

  function escapeHtml(str){
    var div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  loadReviews();
})();