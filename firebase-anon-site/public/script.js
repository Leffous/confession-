// script.js - Firebase-backed anon stories (live)
/*
1) Create a Firebase project at https://console.firebase.google.com/
2) In Project Settings -> Add web app -> copy the config and paste into firebaseConfig below.
3) In Firestore -> Create database (choose mode as you prefer)
4) IMPORTANT: Set Firestore rules for public read/write for testing (see README).
*/

// Paste your Firebase config here
const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_AUTH_DOMAIN",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_STORAGE_BUCKET",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const col = db.collection('stories');

const postBtn = document.getElementById('postBtn');
const storyInput = document.getElementById('story');
const storiesEl = document.getElementById('stories');
const status = document.getElementById('status');

function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

postBtn.addEventListener('click', async ()=>{
  const text = (storyInput.value||'').trim();
  if (!text) { status.textContent = 'Write something first.'; return; }
  postBtn.disabled = true; status.textContent = 'Posting...';
  try{
    await col.add({ text, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    storyInput.value = ''; status.textContent = 'Posted ✓';
    setTimeout(()=>status.textContent='',1200);
  }catch(e){
    console.error(e); status.textContent = 'Error posting.';
  }finally{ postBtn.disabled = false; }
});

// realtime listener - newest first (limit 200)
col.orderBy('createdAt','desc').limit(200).onSnapshot(snap => {
  storiesEl.innerHTML = '';
  snap.forEach(doc => {
    const d = doc.data();
    const div = document.createElement('div');
    div.className = 'story';
    const when = d.createdAt ? new Date(d.createdAt.seconds*1000).toLocaleString() : '';
    div.innerHTML = '<div style="white-space:pre-wrap">'+escapeHtml(d.text || '')+'</div><div style="margin-top:8px;font-size:12px;color:#9aa8b0">'+when+'</div>';
    storiesEl.appendChild(div);
  });
});