onload = function()
{
    var ProductName = this.document.querySelector('.ProductName');
    var Price = this.document.querySelector('.Price');
    var Taxes = this.document.querySelector('.Taxes');
    var Ads = this.document.querySelector('.Ads');
    var Discount = this.document.querySelector('.Discount');
    var Total = this.document.querySelector('.Total');
    var Count = this.document.querySelector('.Count');
    var Category = this.document.querySelector('.Category');
    var CreateButton = this.document.querySelector('.CreateButton');
    var table = this.document.querySelector("table");
    const DeleteAllButton = this.document.querySelector('.DeleteAll');
    var UpdateProduct = document.getElementById("UpdateProduct");
    const ConfirmButton = document.querySelector(".ConfirmButton");
    const CloseButton = document.querySelector(".CloseButton");
    var ProductUpdateName = document.querySelector(".ProductUpdateName");
    const SearchBar = document.querySelector(".SearchBar");
    const SearchByName = document.querySelector(".SBName");
    const SearchByCategory = document.querySelector(".SBCategory");
    let totalValue;

    var ProductNameU = document.querySelector(".ProductNameU");
    var PriceU = document.querySelector(".PriceU");
    var TaxesU = document.querySelector(".TaxesU");
    var AdsU = document.querySelector(".AdsU");
    var DiscountU = document.querySelector(".DiscountU");
    var TotalU = document.querySelector(".TotalU");
    var CountU = document.querySelector(".CountU");
    var CategoryU = document.querySelector(".CategoryU");

    ProductName.focus();

    function CountTotal()
    {
        let total;
        if (Price.value.length > 0 && Taxes.value.length > 0 && Ads.value.length > 0)
        {
            total = Number(Price.value) + Number(Taxes.value) + Number(Ads.value) + Number(Discount.value);
            Total.innerHTML = "Total: " + String(total);
            Total.className = "Total white bggreen";
        }
        else
        {
            Total.innerHTML = "Total: Undefined";
            totalValue = null;
            Total.className = "Total white bgred";
        }
        return total;
    }
    function GetProductsArray()
    {
        var Products = document.querySelectorAll("tr");
        let ProductsArray = [];
        for (let i = 0; i < Products.length; i++)
        {
            if (localStorage[Products[i].id])
            {
                ProductsArray.push(Products[i]);
            }
        }
        return ProductsArray;
    }

    let z = -1;
    function CreateTProduct(object)
    {
        const TR = document.createElement("tr")
        table.appendChild(TR);
        TR.className = "template " + String(object.Category);
        TR.id = object.Name;

        const td1 = document.createElement("td")
        TR.appendChild(td1);
        const ID = document.createElement("h3")
        td1.appendChild(ID);
        ID.innerHTML = z+1;
        ID.className = "white rb";

        const td2 = document.createElement("td")
        TR.appendChild(td2);
        const NAME = document.createElement("h3")
        td2.appendChild(NAME);
        NAME.innerHTML = object.Name;
        NAME.className = "white rb";

        const td3 = document.createElement("td")
        TR.appendChild(td3);
        const PRICE = document.createElement("h3")
        td3.appendChild(PRICE);
        PRICE.innerHTML = object.Price;
        PRICE.className = "white rb";

        const td4 = document.createElement("td")
        TR.appendChild(td4);
        const TAXES = document.createElement("h3")
        td4.appendChild(TAXES);
        TAXES.innerHTML = object.Taxes;
        TAXES.className = "white rb";

        const td5 = document.createElement("td")
        TR.appendChild(td5);
        const ADS = document.createElement("h3")
        td5.appendChild(ADS);
        ADS.innerHTML = object.Ads;
        ADS.className = "white rb";

        const td6 = document.createElement("td")
        TR.appendChild(td6);
        const DISCOUNT = document.createElement("h3")
        td6.appendChild(DISCOUNT);
        DISCOUNT.innerHTML = object.Discount;
        DISCOUNT.className = "white rb";

        const td7 = document.createElement("td")
        TR.appendChild(td7);
        const TOTAL = document.createElement("h3")
        td7.appendChild(TOTAL);
        TOTAL.innerHTML = object.Total;
        TOTAL.className = "white rb";

        const td8 = document.createElement("td")
        TR.appendChild(td8);
        const CETAGORY = document.createElement("h3")
        td8.appendChild(CETAGORY);
        CETAGORY.innerHTML = object.Category;
        CETAGORY.className = "white rb";

        const td9 = document.createElement("td")
        TR.appendChild(td9);
        const UPDATE = document.createElement("button")
        td9.appendChild(UPDATE);
        UPDATE.innerHTML = "Update";
        UPDATE.type = "button";
        UPDATE.className = "Update bgdarkgray white";

        const td10 = document.createElement("td")
        TR.appendChild(td10);
        const DELETE = document.createElement("button")
        td10.appendChild(DELETE);
        DELETE.innerHTML = "Delete";
        DELETE.type = "button";
        DELETE.className = "Delete bgred white";

        DELETE.onclick = function()
        {
            if (object.Count > 1)
            {
                var newo = JSON.parse(localStorage[object.Name]);
                newo.Count -= 1;
                localStorage.setItem(object.Name, JSON.stringify(newo));
                localStorage[object.Name].Count -= 1;
                location.reload();
                TR.remove();
            }
            else
            {
                localStorage.removeItem(object.Name);
                location.reload();
                TR.remove();    
            }
        };

        DeleteAllButton.innerText = "Delete All (" + GetCountMaxID() + ")";

        UPDATE.onclick = function()
        {
            UpdateClicked(object);
        }
    }

    function UpdateClicked(object)
    {
        UpdateProduct.style.display = "block";
        ProductUpdateName.innerHTML = "Update " + object.Name;
        ProductNameU.focus();

        ProductNameU.value = object.Name;
        PriceU.value = object.Price;
        TaxesU.value = object.Taxes;
        AdsU.value = object.Ads;
        DiscountU.value = object.Discount;
        TotalU.innerHTML = "Total: " + object.Total;
        CountU.value = object.Count;
        CategoryU.value = object.Category;
        TotalU.className = "Total white bggreen";

        let totalValueU;
        PriceU.oninput = function()
        {
            totalValueU = CountUpdatedTotal();
        };
        TaxesU.oninput = function()
        {
            totalValueU = CountUpdatedTotal();
        };
        AdsU.oninput = function()
        {
            totalValueU = CountUpdatedTotal();
        };
        DiscountU.oninput = function()
        {
            totalValueU = CountUpdatedTotal();
        };

        function CountUpdatedTotal()
        {
            let total;
            if (PriceU.value.length > 0 && TaxesU.value.length > 0 && AdsU.value.length > 0)
            {
                total = Number(PriceU.value) + Number(TaxesU.value) + Number(AdsU.value) + Number(DiscountU.value);
                TotalU.innerHTML = "Total: " + String(total);
                TotalU.className = "Total white bggreen";
            }
            else
            {
                TotalU.innerHTML = "Total: Undefined";
                totalValueU = null;
                TotalU.className = "Total white bgred";
            }
            return total;
        }

        ConfirmButton.onclick = function()
        {
            let OLDName = object.Name;
            let NewObject = object;
            NewObject.Ads = Number(AdsU.value);
            NewObject.Category = CategoryU.value;
            NewObject.Count = Number(CountU.value);
            NewObject.Discount = Number(DiscountU.value);
            NewObject.Name = ProductNameU.value;
            NewObject.Price = Number(PriceU.value);
            NewObject.Taxes = Number(TaxesU.value);
            NewObject.Total = Number(PriceU.value) + Number(TaxesU.value) + Number(AdsU.value) + Number(DiscountU.value);

            localStorage.removeItem(OLDName);
            localStorage.setItem(NewObject.Name, JSON.stringify(NewObject));
            location.reload();
        };
    }
    
    function LoadProducts()
    {
        if (localStorage.length > 0)
        {
            for (let i = 0; i < localStorage.length; i++)
            {
                let object = JSON.parse(localStorage.getItem(localStorage.key(i)));
                for (let x = 0; x < object.Count; x++)
                {
                    z++
                    CreateTProduct(object, z);
                }
            }
        }
    }
    function GetMaxID()
    {
        let value = 0;
        for (let i = 0; i < localStorage.length; i++)
        {
            value++;
        }
        return value+1;
    }
    function GetCountMaxID()
    {
        let value = 0;
        for (let i = 0; i < localStorage.length; i++)
        {
            let Oobject = JSON.parse(localStorage.getItem(localStorage.key(i)));
            value+= Oobject.Count;
        }
        return value;
    }

    LoadProducts();

    Price.oninput = function()
    {
        totalValue = CountTotal();
    };
    Taxes.oninput = function()
    {
        totalValue = CountTotal();
    };
    Ads.oninput = function()
    {
        totalValue = CountTotal();
    };
    Discount.oninput = function()
    {
        totalValue = CountTotal();
    };

    function CreateNewProduct(ProductNameV, totalValueV, CategoryV, countNumber, pricev, taxesv, adsv, discountv)
    {
        let object = {
            Name: ProductNameV,
            Category: CategoryV,
            Count: countNumber,
            Total: totalValueV,
            Price: pricev,
            Ads: adsv,
            Taxes: taxesv,
            Discount: discountv,
        };

        localStorage.setItem(ProductNameV, JSON.stringify(object));
        CreateTProduct(object, GetMaxID()+1);
        location.reload();
    }

    CreateButton.onclick = function()
    {
        if (totalValue != null)
        {
            if(ProductName.value.length > 0 && Category.value.length > 0)
            {
                if (Count.value.length > 0)
                {
                    CreateNewProduct(ProductName.value, totalValue, Category.value, Number(Count.value), Number(Price.value), Number(Taxes.value), Number(Ads.value), Number(Discount.value));
                }
                else
                {
                    let virtualCount = 1;
                    CreateNewProduct(ProductName.value, totalValue, Category.value, virtualCount, Number(Price.value), Number(Taxes.value), Number(Ads.value), Number(Discount.value));
                }
            }
        }
    };

    DeleteAllButton.onclick = function()
    {
        localStorage.clear();
        location.reload();
    };

    CloseButton.onclick = function()
    {
        UpdateProduct.style.display = "none";
        ProductNameU.value = "";
        PriceU.value = "";
        TaxesU.value = "";
        AdsU.value = "";
        DiscountU.value = "";
        TotalU.innerHTML = "";
        CountU.value = "";
        CategoryU.value = "";
    };

    SearchByName.onclick = function()
    {
        if (SearchBar.value.length > 0)
        {
            let ProductsArray = GetProductsArray();
            for (let i = 0; i < ProductsArray.length; i++)
            {
                if (String(ProductsArray[i].id.toLowerCase()).includes(SearchBar.value.toLowerCase()))
                {
                    ProductsArray[i].style.display = "table-row";
                }
                else
                {
                    ProductsArray[i].style.display = "none";
                }
            }
        }
    };

    SearchByCategory.onclick = function()
    {
        if (SearchBar.value.length > 0)
        {
            let ProductsArray = GetProductsArray();
            for (let i = 0; i < ProductsArray.length; i++)
            {
                let spliting = String((ProductsArray[i].className.toLowerCase())).split(' ');
                
                for (let x = 0; x < spliting.length; x++)
                {
                    if (x == 0)
                    {continue;}
                    if (spliting[x].includes(SearchBar.value.toLowerCase()))
                    {
                        ProductsArray[i].style.display = "table-row";
                    }
                    else
                    {
                        if (spliting[x-1].includes(SearchBar.value.toLowerCase()))
                        {
                        }
                        else
                        {
                            ProductsArray[i].style.display = "none";
                        }
                    }
                }
            }
        }
    };

    SearchBar.onblur = function()
    {
        let products = GetProductsArray();
        for (let i = 0; i < products.length; i++)
        {
            products[i].style.display = "table-row";
        }
    };
}