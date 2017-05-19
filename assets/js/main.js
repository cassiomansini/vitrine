(function(){
    console.log('ready');
    var next = document.querySelectorAll('a.next');
    for (iNext = 0; iNext < next.length; iNext++){
        next[iNext].addEventListener('click', function(e){
            e.preventDefault();
            var recommendationList = this.parentNode.querySelector('.recommendation-list');
            console.log(recommendationList.children.length);
            var vitrineItemWidth = this.parentNode.querySelector('.vitrine-item').offsetWidth;
            var recommendationListWidth = (recommendationList.children.length - 1) * vitrineItemWidth;
            var recommendationListLeft = this.parentNode.querySelector('.recommendation-list').style.left;

            if (recommendationListLeft){
                currentLeft = parseFloat(recommendationListLeft);
            }else{
                currentLeft = 0;
            }

            console.log('recommendationListWidth', recommendationListWidth);
            console.log('currentLeft', currentLeft);
            console.log('conta a', recommendationListWidth - ((currentLeft - vitrineItemWidth) * -1));

            if (recommendationListWidth - ((currentLeft - vitrineItemWidth) * -1) > vitrineItemWidth * -1){
                recommendationList.style.left = currentLeft - vitrineItemWidth + 'px';
            }

        }, false);
    }

    var prev = document.querySelectorAll('a.prev');
    for (iPrev = 0; iPrev < prev.length; iPrev++){
        prev[iPrev].addEventListener('click', function(e){
            e.preventDefault();
            var recommendationList = this.parentNode.querySelector('.recommendation-list');
            var recommendationListWidth = this.parentNode.querySelector('.recommendation-list').offsetWidth;
            var recommendationListLeft = this.parentNode.querySelector('.recommendation-list').style.left;
            var vitrineItemWidth = this.parentNode.querySelector('.vitrine-item').offsetWidth;

            if (recommendationListLeft){
                currentLeft = parseFloat(recommendationListLeft);
            }else{
                currentLeft = 0;
            }

            if (currentLeft != 0){
                recommendationList.style.left = currentLeft + vitrineItemWidth + 'px';
            }

        }, false);
    }

    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'assets/js/reference.json', true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    function createVitrineItem(item){
        var vitrineItem = document.createElement('div');
            vitrineItem.classList.add('vitrine-item');

        var a = document.createElement('a');
            a.setAttribute('href', item.detailUrl);
            vitrineItem.appendChild(a);

        var img = document.createElement('img');
            img.setAttribute('src', item.imageName);
            img.setAttribute('alt', item.name);
            img.setAttribute("width", '155');
            a.appendChild(img);

        var p = document.createElement('p');
            p.classList.add('name');
            p.innerHTML = item.name;
            a.appendChild(p);
            delete window.p;

        if (item.oldPrice){
            var p = document.createElement('p')
                p.classList.add('old-price');
                p.innerHTML = 'De: ' + item.oldPrice;
                a.appendChild(p);
                delete window.p;
        }

        var p = document.createElement('p');
            p.classList.add('price');
            p.innerHTML = 'Por: <strong>' + item.price + '</strong>';
            a.appendChild(p);
            delete window.p;

        if (item.productInfo.paymentConditions){
            var p = document.createElement('p')
                p.classList.add('payment-conditions');
                p.innerHTML = item.productInfo.paymentConditions;
                a.appendChild(p);
                delete window.p;
        }    

        return vitrineItem;    
    }

    loadJSON(function(response) {
        var vitrine = JSON.parse(response);

        var referencia = createVitrineItem(vitrine.reference.item);
        document.querySelector('.vitrine-box .reference').appendChild(referencia);
        delete window.referencia;

        for(var i=0; i < vitrine.recommendation.length; i++){
            var recomendacao = createVitrineItem(vitrine.recommendation[i]);
            document.querySelector('.recommendation-list').appendChild(recomendacao);
            delete window.recomendacao;
        }
    });

})();