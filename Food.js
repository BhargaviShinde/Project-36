class Food{
    constructor(){
        this.foodStock = 3;
        this.image = loadImage("Milk.png");
        this.Lastfed;
    }

    lastfed(){
        this.lastFed = new Date();
        var time = this.lastFed.getHours();
        //console.log(time);

        //database.ref('/lastFed').update({
            //lastFed: this.Lastfed
          //})
    }

    display(){
        var x = 80
        var y = 100;

        //imageMode(CENTER);
        //image(this.image, 150, 100, 70, 70);

        if(this.foodStock !== 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 10 === 0){
                    x = 80;
                    y += 50;
                }
                image(this.image,x,y,70,70);
                x += 30;
           
            }
        }
    }

    addFoods(){
        this.foodStock += 1;
        database.ref('FoodStock/FoodStock').update({
            FoodStock: this.foodStock, 
        });

    }

    updateStock(){
        this.foodStock -= 1;
        database.ref('FoodStock').update({
        FoodStock: this.foodStock,
        });
    }

    updateLastFed(){
        database.ref('lastFed').update({
            lastFed: this.Lastfed
          })
    }
}