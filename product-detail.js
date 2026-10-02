(function(){
  var products=window.USHA_PRODUCTS||[];
  var requestedItem=new URLSearchParams(window.location.search).get('item');
  var product=products.find(function(item){return item.slug===requestedItem;});
  var detail=document.getElementById('productDetail');
  var missing=document.getElementById('productMissing');

  if(!product){
    detail.hidden=true;
    missing.hidden=false;
    return;
  }

  var formatPrice=function(value){return '₹ '+value.toLocaleString('en-IN')};
  var image=document.getElementById('productImage');
  var thumbnails=document.getElementById('productThumbnails');
  var badge=document.getElementById('productBadge');
  var photoFiles=product.photos;

  document.title=product.name+' | Usha Gift House';
  document.querySelector('meta[name="description"]').content=product.name+': '+product.summary+' Enquire with Usha Gift House.';
  document.getElementById('productBreadcrumb').textContent=product.name;
  document.getElementById('productTitle').textContent=product.name;
  document.getElementById('productSummary').textContent=product.summary;
  document.getElementById('productPrice').textContent=formatPrice(product.price);
  document.getElementById('productOriginalPrice').textContent=formatPrice(product.originalPrice);
  document.getElementById('productIncludes').textContent=product.includes;
  document.getElementById('productDescription').textContent=product.description;
  if(product.badge){
    badge.textContent=product.badge;
    badge.hidden=false;
  }

  var phoneNumber='919152919136';
  var enquiryText='Hello Usha Gift House, I am interested in: '+product.name;
  var enquiryLink=document.getElementById('productEnquire');
  enquiryLink.href='https://wa.me/'+phoneNumber+'?text='+encodeURIComponent(enquiryText);
  document.getElementById('productCall').href='tel:+'+phoneNumber;

  function selectPhoto(index){
    image.src='images/'+photoFiles[index];
    image.alt=product.name+' - photo '+(index+1)+' of '+photoFiles.length;
    thumbnails.querySelectorAll('button').forEach(function(button,buttonIndex){
      button.setAttribute('aria-pressed',buttonIndex===index?'true':'false');
    });
  }

  photoFiles.forEach(function(photo,index){
    var button=document.createElement('button');
    button.type='button';
    button.className='detail-thumb';
    button.setAttribute('aria-label','Show product photo '+(index+1)+' of '+photoFiles.length);
    button.setAttribute('aria-pressed','false');
    var thumbnail=document.createElement('img');
    thumbnail.src='images/'+photo;
    thumbnail.alt='';
    thumbnail.loading='lazy';
    button.appendChild(thumbnail);
    button.addEventListener('click',function(){selectPhoto(index)});
    thumbnails.appendChild(button);
  });

  selectPhoto(0);
})();
