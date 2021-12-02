let viewmorecity = () =>{
    console.log("Clicked");
    let viewmorebtn = document.getElementById('viewhere');

    if(viewmorebtn.innerText === "View More")
    {
        document.getElementById('city-cards-two').style.display = "flex";
        viewmorebtn.innerText = "View Less";
    } else{
        document.getElementById('city-cards-two').style.display = "none";
        viewmorebtn.innerText = "View More";
    }
}; 

let cityObjectList = new Array();


// let fetchDishes = async () => {
//     let enteredCitiString = document.getElementById("input_search");
//     enteredCitiString.addEventListener('input', (event) => {
//         let newValue = event.currentTarget.value;
//         console.log("You have entered this......", newValue);

//     let result = await fetch( "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?lang=en_US&units=km&rapidapi-key=9929b549bdmsh519be7692f11e24p1009a1jsn9f08cd2457fb&query="`${newValue}`);
//     let respObject = await result.json();
//     respObject.data.result_object.forEach((element) => {
//         let eachMeal = {
//           cityName: element.name, 
//         };
//       cityObjectList.push(eachMeal);
//     });
//     createCityListAndAttachToUL(cityObjectList);
// });
//   };
let searchCities = () => {
    let enteredCitiString = document.getElementById("input_search");
    enteredCitiString.addEventListener('input', (event) => {
        let newValue = event.currentTarget.value;
        console.log("You have entered this......", newValue);

        let xhttp = new XMLHttpRequest();
        let tripAdvisorURL = "https://travel-advisor.p.rapidapi.com/";
        let tripAdvisorKey = "9929b549bdmsh519be7692f11e24p1009a1jsn9f08cd2457fb";
        let tripAdvisorHost ="travel-advisor.p.rapidapi.com";

        let url =`${tripAdvisorURL}locations/auto-complete?&lang=en_US&units=km&query=${newValue}`;
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("X-RapidAPI-Host", tripAdvisorHost);
        xhttp.setRequestHeader("X-RapidAPI-Key", tripAdvisorKey);
        xhttp.send();

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState === 4 && xhttp.status === 200){
                let jsonObject = JSON.parse(xhttp.response); 
                 console.log(jsonObject);
                jsonObject.data.forEach((element) => {  
                    let eachMeal = {
                        cityName: element.result_object.name,
                    }
                    cityObjectList.push(eachMeal); 
                  }); 
                  createCityListAndAttachToUL(cityObjectList);
            }
        };

    });
};



const createCityListAndAttachToUL = (cityArrayList) => {
    const allCityStringAppended = cityArrayList
      .map((cityObject) => {
        return `<li  name="input_search" id="input_search">  ${cityObject.cityName}  </li>`;
      })
      .join("");
    console.log(allCityStringAppended);
   
    const cityListUL = document.getElementById("cityList");
    cityListUL.innerHTML = allCityStringAppended;
  };
   
  const searchBarDiv = document.getElementById("input_search");
  
  searchBarDiv.addEventListener("keyup", (searchEventObject) => {
    let cityAreaSearch = searchEventObject.currentTarget.value.toLowerCase();
    const filteredSearchList = cityObjectList.filter((eachCity) =>
        eachCity.cityName.toLowerCase().includes(cityAreaSearch)
    );
    createCityListAndAttachToUL(filteredSearchList);
  });
   
   searchCities(); 

   $('#click_City').on('click', function() {
    var $val = $('#getValue').text();
    document.getElementById("get_Value").value= $val;
    var a= document.getElementById("get_Value").value;
    localStorage.setItem("myValue", a); 
}); 
 

