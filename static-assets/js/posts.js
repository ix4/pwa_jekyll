var JekyllPWA=JekyllPWA||{},mentions=[];const page=document.getElementById("page-path").value,webmention="https://webmention.io/api/mentions?target=",pageID=document.getElementById("page-id").value,request=webmention+page;var indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB||window.shimIndexedDB;JekyllPWA.Posts={init:function(){this.initCreateMentionsStore(),this.initDisplayMentions()},initCreateMentionsStore:function(){var e=indexedDB.open("Mentions",1);e.onupgradeneeded=function(){e.result.createObjectStore(pageID,{keyPath:"id"}).createIndex("mentions","id")}},initCheckForStoredMentions:function(){var e=window.indexedDB.open("Mentions",1);e.onsuccess=function(n){db=e.result;var t=db.transaction([pageID],"readwrite").objectStore(pageID).getAll();t.onsuccess=function(e){var n=t.result;n.length>=mentions.length&&(mentions=[],n.forEach(function(e){mentions.push({id:e.id,source:e.source,target:e.target,content:e.content,author:e.author,url:e.url,fromID:"yeah"})}))}}},initDisplayMentions:function(){fetch(request).then(e=>e.json()).then(e=>{0==e.links.length?console.log("no mentions yet"):(document.querySelector(".post-webmentions").removeAttribute("hidden"),e.links.forEach(function(e){var n=document.getElementById("mention-tmpl").content.cloneNode(!0);n.querySelector(".mention-reply-content").innerHTML=e.data.content,n.querySelector(".mention-reply-author").innerText=e.data.author.name,n.querySelector(".mention-reply-link").setAttribute("href",e.source),n.querySelector(".mention-reply-link").innerText=e.data.author.url,document.getElementById("webmentions-container").appendChild(n),mentions.push({id:e.id,source:e.source,target:e.target,content:e.data.content,author:e.data.author.name,url:e.data.author.url})}))}).then(function(){mentions.forEach(function(e){window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB||window.shimIndexedDB;var n=window.indexedDB.open("Mentions",1);n.onsuccess=function(t){db=n.result;var o=db.transaction([pageID],"readwrite"),i=o.objectStore(pageID);i=(o=db.transaction([pageID],"readwrite")).objectStore(pageID),objectStoreRequest=i.put({id:e.id,source:e.source,target:e.target,content:e.content,author:e.author,url:e.author}),objectStoreRequest.oncomplete=function(e){console.log("asd")}}})})}},JekyllPWA.Posts.init();