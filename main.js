(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-10",headers:{authorization:"8f3d3456-430a-4c87-a5de-14735dcc84d0","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Error: ".concat(e))}function n(e){document.removeEventListener("keydown",r),document.removeEventListener("click",o),e.querySelector(".popup__close").removeEventListener("click",c),e.classList.remove("popup_is-opened")}function r(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function o(e){e.target.matches(".popup_is-opened")&&n(e.target)}function c(e){n(e.target.closest(".popup"))}function u(e){e.classList.add("popup_is-animated"),e.classList.add("popup_is-opened"),document.addEventListener("keydown",r),document.addEventListener("click",o),e.querySelector(".popup__close").addEventListener("click",c)}function a(r,o,c,a,i,l,s,d){var p=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),f=p.querySelector(".card__delete-button"),_=p.querySelector(".card__like-button"),y=p.querySelector(".card__image");return document.querySelector(".popup_type_delete-card"),p.querySelector(".card__image").src=o,p.querySelector(".card__image").alt=r,p.querySelector(".card__title").textContent=r,p.querySelector(".card__like-counter").textContent=a,function(r,o,c,a){var i=document.querySelector(".popup_type_delete-card");r===o?c.addEventListener("click",(function(r){var o=r.target.closest(".card"),c=document.forms["delete-card"];u(i),c.addEventListener("submit",(function(r){r.preventDefault(),function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(a).then((function(e){o.remove()})).catch((function(e){return console.error(e)})),n(i)}))})):c.remove()}(i,l,f,s),function(e,t,n){e.some((function(e){return e._id===n}))&&t.classList.add("card__like-button_is-active")}(d,_,l),_.addEventListener("click",(function(){return a=function(n,r,o,c){return r.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(n).then((function(e){c.querySelector(".card__like-counter").textContent=e.likes.length,r.classList.remove("card__like-button_is-active"),o--})).catch((function(e){return console.error(e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(n).then((function(e){c.querySelector(".card__like-counter").textContent=e.likes.length,r.classList.add("card__like-button_is-active"),o++})).catch((function(e){return console.error(e)})),o}(s,_,a,p)})),y.addEventListener("click",(function(){return c(r,o)})),p}var i=function(e,t){e.classList.remove("popup__input_type_error"),t.querySelector(".".concat(e.id,"-error")).textContent=""};function l(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove("popup__button_disabled"),e.classList.add("popup__button_active")):(e.disabled=!0,e.classList.add("popup__button_disabled"),e.classList.remove("popup__button_active"))}function s(e){e.querySelectorAll(".popup__input_type_error").forEach((function(t){i(t,e)}))}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p=document.querySelector(".places__list"),f=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),y=document.querySelector(".popup_type_image"),m=document.querySelector(".popup_type_change-avatar"),h=document.querySelector(".popup__input_type_card-name"),v=document.querySelector(".popup__input_type_url"),b=document.querySelector(".popup__input_type_name"),S=document.querySelector(".popup__input_type_description"),q=y.querySelector(".popup__caption"),k=y.querySelector(".popup__image"),L=Array.from(document.querySelectorAll(".popup__form")),E=document.forms["edit-profile"],g=document.forms["new-place"],C=document.forms["new-avatar"],x=document.querySelector(".profile"),w=x.querySelector(".profile__edit-button"),A=x.querySelector(".profile__title"),U=x.querySelector(".profile__image"),j=x.querySelector(".profile__description"),O=x.querySelector(".profile__add-button");function T(e,t){q.textContent=e,k.src=t,k.alt=e,u(y)}function D(e){document.querySelector(".popup__button").textContent=e?"Сохранить":"Сохранение..."}E.addEventListener("submit",(function(r){var o,c;r.preventDefault(),D(!1),(o=b.value,c=S.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o,about:c})}).then((function(e){return t(e)}))).then((function(e){A.textContent=e.name,j.textContent=e.about})).catch((function(e){return console.error(e)})).finally((function(){return D(!0)})),n(f)})),w.addEventListener("click",(function(){s(E),u(f),b.value=A.textContent,S.value=j.textContent})),O.addEventListener("click",(function(){u(_),g.reset()})),g.addEventListener("submit",(function(r){var o,c;r.preventDefault(),D(!1),(o=h.value,c=v.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:o,link:c})}).then((function(e){return t(e)}))).then((function(e){return p.prepend(a(e.name,e.link,T,e.likes.length,e.owner._id,e.owner._id,e._id,e.likes))})).catch((function(e){return console.error(e)})).finally((function(){return D(!0)})),n(_),s(g),g.reset()})),L.forEach((function(e){var t,n,r;t=e,n=Array.from(t.querySelectorAll(".popup__input")),l(r=t.querySelector(".button"),n),n.forEach((function(e){e.addEventListener("input",(function(){(function(e,t){e.validity.patternMismatch?e.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"):e.setCustomValidity(""),e.validity.valid?i(e,t):function(e,t){e.classList.add("popup__input_type_error"),t.querySelector(".".concat(e.id,"-error")).textContent=e.validationMessage}(e,t)})(e,t),l(r,n)}))}))})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];A.textContent=o.name,j.textContent=o.about,U.style='background-image: url("'.concat(o.avatar,'")'),c.forEach((function(e){return p.append(a(e.name,e.link,T,e.likes.length,e.owner._id,o._id,e._id,e.likes))}))})).catch((function(e){return console.error(e)})),U.addEventListener("click",(function(){u(m),C.reset(),s(C)})),C.addEventListener("submit",(function(r){var o;r.preventDefault(),D(!1),(o=C.querySelector(".popup__input").value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then((function(e){return t(e)}))).then((function(e){return U.style='background-image: url("'.concat(e.avatar,'")')})).catch((function(e){return console.error(e)})).finally((function(){return D(!0)})),n(m),s(C)}))})();