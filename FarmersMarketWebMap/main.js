require
  ([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Directions",
  "esri/config",
  "esri/widgets/Home",
  "esri/renderers/UniqueValueRenderer",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend",
  "esri/widgets/BasemapToggle",
  "esri/Graphic",
  "esri/layers/FeatureLayer",
  "esri/rest/support/Query",
  "esri/symbols/PictureMarkerSymbol",
  "dojo/domReady!"
  ], 
   
  function 
  (
  Map,
  MapView, 
  Directions, 
  esriConfig, 
  Home, 
  UniqueValueRenderer, 
  FeatureLayer, 
  Legend, 
  BasemapToggle, 
  Graphic, 
  FeatureLayer,
  Query, 
  PictureMarkerSymbol
  ) 
   
  {
  
  let MarketsRenderer = {
    type: "unique-value",
    field: "NEIGHBORHO",
    legendOptions:
      {
      title: "Neighborhoods"
      },
    uniqueValueInfos: 
      [{
        value: "Center City",
        symbol:
          {
          type: "picture-marker",
          url: "https://pennstate.maps.arcgis.com/sharing/rest/content/items/7afccd1b787e4f0f9f4126c42322a8af/data",
          width: "18px",
          height: "18px"
          }
      },
      {
        value: "Germantown/ Chestnut Hill",
        symbol:
          {
          type: "picture-marker",
          url: "https://pennstate.maps.arcgis.com/sharing/rest/content/items/69babe74f8934086b9263fe2d42809eb/data",
          width: "18px",
          height: "18px"
          }
      },
      {
        value: "Lower North",
        symbol:
          {
          type: "picture-marker",
          url: "https://pennstate.maps.arcgis.com/sharing/rest/content/items/1695016428de458a82108f4f915b9f5b/data",
          width: "18px",
          height: "18px"
          }
      },
      {
        value: "North",
        symbol:
          {
          type: "picture-marker",
          url: "https://pennstate.maps.arcgis.com/sharing/rest/content/items/9d84f99181d2420d809dca54069e8b31/data",
          width: "18px",
          height: "18px"
          }
      },
      {
        value: "Northeast",
        symbol: 
          {
          type: "picture-marker",
          url: "https://pennstate.maps.arcgis.com/sharing/rest/content/items/93a1e140dd154289b9afef07ee706d72/data",
          width: "18px",
          height: "18px"
          }
      },
      {
        value: "Northwest",
        symbol: 
          {
          type: "picture-marker",
          url: "https://pennstate.maps.arcgis.com/sharing/rest/content/items/765b20c293414ebbafa0cbbe85578714/data",
          width: "18px",
          height: "18px"
          }
      },
      {
        value: "Roxborough/ Manayunk",
        symbol: 
          {
          type: "picture-marker",
          url: "https://pennstate.maps.arcgis.com/sharing/rest/content/items/11de480af4c64d41bf6e56201c51427c/data",
          width: "18px",
          height: "18px"
          }
      },
      {
        value: "South",
        symbol: 
          {
          type: "picture-marker",
          url: "https://pennstate.maps.arcgis.com/sharing/rest/content/items/f0d211147e9141199b302e1069a91f15/data",
          width: "18px",
          height: "18px"
          }
      },
      {
        value: "Southwest",
        symbol: 
          {
          type: "picture-marker",
          url: "https://pennstate.maps.arcgis.com/sharing/rest/content/items/2b27f1ede0e845ca811d4960d7a142d8/data",
          width: "18px",
          height: "18px"
          }
      },
      {
        value: "West",
        symbol: 
          {
          type: "picture-marker",
          url: "https://pennstate.maps.arcgis.com/sharing/rest/content/items/3890fcfb49784691b75344510a731af1/data",
          width: "18px",
          height: "18px"
          }
       }]
    };

    const map = new Map
      ({
      basemap: "gray"
      });

    const view = new MapView
      ({
      container: "viewDiv",
      map: map,
      center: [-75.15280974631847,40.0000044134604755],
      zoom: 12
      });

    var listNode = document.getElementById("list_markets");

    var fmarkets = new FeatureLayer
      ({
      url: "https://services9.arcgis.com/6EuFgO4fLTqfNOhu/arcgis/rest/services/The_Potential_for_Urban_Agriculture_in_Philadelphia/FeatureServer/1",
      renderer: MarketsRenderer,
      outFields: ["NAME", "NEIGHBORHO", "ADDRESS", "DAY", "TIME", "MONTHS", "MAJOR_BUS_"],
      title: "Farmers Markets",
      popupTemplate: 
        {
        title: "Farmers Market Information",
        content: 
          [{
          type: "fields",
          fieldInfos: 
            [{
            fieldName: "NAME",
            label: "Market Name"
            },
            {
            fieldName: "NEIGHBORHO",
            label: "Neighborhood",
            },
            {
            fieldName: "ADDRESS",
            label: "Address",
            },
            {
            fieldName: "DAY",
            label: "Day",
            },
            {
            fieldName: "TIME",
            label: "Time",
            },
            {
            fieldName: "MONTHS",
            label: "Months",
            },
            {
            fieldName: "MAJOR_BUS_",
            label: "Neary Bus Routes",
            }]
         }]
       }
    });
  
    map.add(fmarkets);
  
    var legend = new Legend
      ({
      view: view,
      layerInfos: 
        [{
        layer: fmarkets,
        }]
      });
  
    view.ui.add(legend, "bottom-right");
  
    var toggle = new BasemapToggle
      ({
      view: view,
      nextBasemap: "streets"
      });
  
    view.ui.add(toggle, "top-left");
  
    view.ui.add(document.getElementById("optionsDiv"), 
       {
       position: "top-right",
       index: 0
       });
  
    let linesymbol = 
       {
       type: "simple-line",
       color: "#55d182",
       width: "5px",
       style: "short-dash"
       };
  
    let directionsWidget = new Directions
       ({
       view: view,
       routeSymbol: linesymbol,
       apiKey: "AAPKb060d4b70f76424585fdb8bf59b5c9cbEyqGh7Tp1DBxOkwD9krtyaVWH3PVyvugPbqpxbW529yYz79NFwh5GNDNsysX1C2W"
       });

    view.ui.add(directionsWidget, 
       {
       position: "bottom-left"
       });
  
    let homeWidget = new Home
       ({
       view: view
       });

    view.ui.add(homeWidget, "top-left");
  
    var graphics;
  
    view.whenLayerView(fmarkets).then(function(layerView) 
       {
       layerView.watch("updating", function(value) 
          {
          if (!value) 
             {
             layerView
             .queryFeatures
                ({
                geometry: view.extent,
                returnGeometry: true,
                orderByFields: ["ADDRESS"]
                })
             .then(function(results) 
                {
                graphics = results.features;

                const fragment = document.createDocumentFragment();

                graphics.forEach(function(result, index) 
                    {
                    const attributes = result.attributes;
                    const name = attributes.NAME;
                    const li = document.createElement("li");
                  
                    li.classList.add("panel-result");
                    li.tabIndex = 0;
                    li.setAttribute("data-result-id", index);
                    li.textContent = name;

                    fragment.appendChild(li);
                    });

               listNode.innerHTML = "";
               listNode.appendChild(fragment);
               })
               
               .catch(function(error) 
                   {
                   console.error("query failed: ", error);
                   });
            }
         });
      });
  
    listNode.addEventListener("click", onListClickHandler);

    function onListClickHandler(event) 
        {
        const target = event.target;
        const resultId = target.getAttribute("data-result-id");
        const result = resultId && graphics && graphics[parseInt(resultId, 10)];

        if (result)
           {           
           view
           .goTo(result.geometry)
           .then(function() 
               {
               view.popup.open
                  ({
                  features: [result],
                  location: result.geometry
                  });
               })
           .catch(function(error) 
               {
               if (error.name != "AbortError") 
                  {
                  console.error(error);
                  }
               });
             }
          }
  
  function gotomarket(event) 
    {
    let themarkets = document.getElementById("marketSelect").value;
    fmarkets.definitionExpression = themarkets;
		  
    let query = new Query
       ({
       where: themarkets, 
       returnGeometry: true,
       });
	
       fmarkets.when(function () 
         {
         return fmarkets.queryFeatures(query);
         })
       
       .then(displayResults);
    };
 
  function displayResults(results) 
     {
     var fragment = document.createDocumentFragment();
    
     results.features.forEach(function(markets, index) 
         {
         graphics.push(markets);
         });
     };

    document
    .getElementById("marketSelect")
    .addEventListener("change", gotomarket);
  
});