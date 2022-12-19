window.onload = () => {
    const ModalBox = document.getElementById("modalee");
    axios.get("https://www.themealdb.com/api/json/v1/1/random.php").then((res)=>{
        let Data = res.data.meals;
        const randomFood = document.createElement('div');
        const foodName = document.createElement('h2');
        const foodImage = document.createElement('img');
        foodName.innerText = Data[0].strMeal;
        foodImage.setAttribute('src',Data[0].strMealThumb);
        foodImage.setAttribute('height','450px');
        randomFood.append(foodName);
        randomFood.append(foodImage);
        document.querySelector('#random').append(randomFood);
        foodImage.onclick = () => {
            ModalBox.innerHTML = "Required Ingredients are: <br><br>";
            for(let i=1;i<=20;i++){
                let key = `strIngredient${i}`;
                if(Data[0].hasOwnProperty(key)){
                    if(res.data.meals[0][key]!=null && res.data.meals[0][key]!=""){
                        ModalBox.innerHTML += res.data.meals[0][key] + `<br>`;
                    }
                }
            }
            document.getElementById("modale").style.display= "block";
        }
        window.onclick = function(e){
            if(e.target ==  document.getElementById("modale")){
                document.getElementById("modale").style.display = 'none';
            }
        }
    }).catch((err)=>{
        console.log('Error');
    })
}
