(function(){
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();

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
  let photoFile = null;

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

  photoInput.addEventListener('change', function(){
    var file = photoInput.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('사진은 5MB 이하만 첨부 가능합니다.');
      photoInput.value = '';
      return;
    }
    photoFile = file;
    var reader = new FileReader();
    reader.onload = function(e){
      previewImg.src = e.target.result;
      previewWrap.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });
  removePhotoBtn.addEventListener('click', function(){
    photoFile = null;
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

    function saveReview(photoURL){
      db.collection('reviews').add({
        name: name,
        area: area,
        service: service,
        rating: rating,
        content: content,
        photoURL: photoURL || null,
        status: 'approved',
        website: honeypot,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(function(){
        localStorage.setItem('lc_last_review_time', Date.now().toString());
        form.reset();
        photoFile = null;
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
    }

    if (photoFile) {
      var ref = storage.ref().child('reviews/' + Date.now() + '_' + photoFile.name);
      ref.put(photoFile).then(function(snap){
        return snap.ref.getDownloadURL();
      }).then(function(url){
        saveReview(url);
      }).catch(function(err){
        console.error(err);
        saveReview(null);
      });
    } else {
      saveReview(null);
    }
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
    var photoHtml = r.photoURL ? '<img src="' + r.photoURL + '" class="ur-card-photo" alt="후기 사진" />' : '';
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