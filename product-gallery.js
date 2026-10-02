(function(){
  var products=window.USHA_PRODUCTS||[];
  var productByName={};
  products.forEach(function(product){productByName[product.name]=product});

  document.querySelectorAll('.gcard').forEach(function(card){
    var title=card.querySelector('h3');
    var product=productByName[title&&title.textContent.trim()];
    var photos=product&&product.photos;
    var image=card.querySelector('.gimg img');
    if(!photos){
      card.remove();
      return;
    }
    if(!image)return;

    card.dataset.viewGroup=product.photoGroup;
    var productName=product.name;
    var current=0;
    var controls=document.createElement('div');
    controls.className='product-views';
    var count=document.createElement('span');
    count.className='view-count';
    count.setAttribute('aria-live','polite');
    var thumbnails=document.createElement('div');
    thumbnails.className='view-thumbnails';
    thumbnails.setAttribute('aria-label',productName+' photos');

    function selectPhoto(index){
      current=index;
      image.src='images/'+photos[index];
      image.alt=productName+' — photo '+(index+1)+' of '+photos.length;
      count.textContent='Photo '+(index+1)+' of '+photos.length;
      thumbnails.querySelectorAll('button').forEach(function(button,i){
        button.setAttribute('aria-pressed',i===index?'true':'false');
      });
    }

    photos.forEach(function(photo,index){
      var button=document.createElement('button');
      button.type='button';
      button.className='view-thumb';
      button.setAttribute('aria-label','Show photo '+(index+1)+' of '+photos.length);
      button.setAttribute('aria-pressed','false');
      var thumbnail=document.createElement('img');
      thumbnail.src='images/'+photo;
      thumbnail.alt='';
      thumbnail.loading='lazy';
      button.appendChild(thumbnail);
      button.addEventListener('click',function(){selectPhoto(index)});
      thumbnails.appendChild(button);
    });

    controls.append(count,thumbnails);
    card.insertBefore(controls,card.querySelector('.ginfo'));
    selectPhoto(current);
  });
})();