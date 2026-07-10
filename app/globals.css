@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..700&family=Space+Grotesk:wght@400;500;700&display=swap');

:root{
  --navy: #4A331E;
  --navy-deep: #2B1D12;
  --gold: #D4A574;
  --gold-soft: #E8C58A;
  --cream: #F4E8D6;
  --line: rgba(244,232,214,0.16);
  --panel: rgba(244,232,214,0.05);
}

*{box-sizing:border-box;}
html,body{margin:0;padding:0;}
body{
  background:var(--navy-deep);
  color:var(--cream);
  font-family:'Space Grotesk',sans-serif;
  min-height:100vh;
}
a{color:inherit; text-decoration:none;}
h1,h2,h3{font-family:'Fraunces',serif; font-weight:600; margin:0;}

.container{max-width:1100px; margin:0 auto; padding:0 24px;}

.topbar{
  display:flex; justify-content:space-between; align-items:center;
  padding:22px 24px; border-bottom:1px solid var(--line);
}
.logo{font-family:'Fraunces',serif; font-size:1.4rem; font-weight:600;}
.logo span{color:var(--gold);}
.nav-actions{display:flex; gap:14px; align-items:center;}

.btn{
  display:inline-block; border-radius:999px; padding:10px 20px;
  font-size:0.9rem; font-weight:500; border:1px solid var(--line);
  cursor:pointer; background:none; color:var(--cream); transition:.2s;
}
.btn:hover{border-color:var(--gold);}
.btn-primary{background:var(--gold); color:var(--navy-deep); border:none; font-weight:600;}
.btn-primary:hover{opacity:0.9;}

.search-bar{
  display:flex; gap:10px; margin:32px 0;
}
.search-bar input, .search-bar select{
  background:var(--panel); border:1px solid var(--line); color:var(--cream);
  padding:12px 16px; border-radius:10px; font-size:0.95rem; font-family:inherit;
}
.search-bar input{flex:1;}

.grid{
  display:grid; grid-template-columns:repeat(auto-fill, minmax(220px,1fr));
  gap:22px; margin:24px 0 60px;
}
.card{
  background:var(--panel); border:1px solid var(--line); border-radius:14px;
  overflow:hidden; transition:.25s; display:flex; flex-direction:column;
}
.card:hover{transform:translateY(-4px); border-color:rgba(232,184,75,0.4);}
.card img{width:100%; aspect-ratio:1/1; object-fit:cover; background:#15193a;}
.card-body{padding:14px 16px;}
.card-body h3{font-size:1rem; margin-bottom:4px;}
.card-body .price{color:var(--gold-soft); font-weight:600; margin-top:6px;}
.card-body .meta{font-size:0.8rem; color:rgba(246,241,228,0.5); margin-top:4px;}

form.panel{
  background:var(--panel); border:1px solid var(--line); border-radius:16px;
  padding:32px; max-width:480px; margin:40px auto;
}
form.panel label{display:block; font-size:0.85rem; margin:16px 0 6px; color:rgba(246,241,228,0.7);}
form.panel input, form.panel textarea, form.panel select{
  width:100%; background:var(--navy-deep); border:1px solid var(--line); color:var(--cream);
  padding:12px 14px; border-radius:10px; font-family:inherit; font-size:0.95rem;
}
form.panel textarea{resize:vertical; min-height:90px;}

.empty-state{
  text-align:center; padding:80px 20px; color:rgba(246,241,228,0.5);
}

.detail-grid{
  display:grid; grid-template-columns:1fr 1fr; gap:40px; margin:40px 0;
}
@media(max-width:760px){.detail-grid{grid-template-columns:1fr;}}
.detail-grid img{width:100%; border-radius:14px; background:#15193a;}

.chat-box{
  border:1px solid var(--line); border-radius:14px; padding:18px; max-width:480px;
  display:flex; flex-direction:column; gap:10px; min-height:240px; background:var(--panel);
}
.msg{padding:10px 14px; border-radius:10px; max-width:80%; font-size:0.9rem;}
.msg.mine{align-self:flex-end; background:var(--gold); color:var(--navy-deep);}
.msg.theirs{align-self:flex-start; background:rgba(246,241,228,0.08);}

.error{color:#f3a8a8; font-size:0.85rem; margin-top:10px;}
.success{color:var(--gold-soft); font-size:0.85rem; margin-top:10px;}
