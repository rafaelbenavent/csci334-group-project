﻿$(document).ready(function () {
    getSaleRecords();
    getAllSearchedItems();
    // prevent form submission on enter
    $('form').keypress(function (event) {
        return event.keyCode != 13;
    });
    // Search as the user types
    var searchbar = $("#searchbar")[0];
    searchbar.addEventListener("keyup", function (event) {
        event.preventDefault();
        getSaleRecords();
        //getAllSearchedItems();
    });
    $("#advSearch")[0].addEventListener("click", function () {
        displayAdvSearch();
    });
    /*$("#addButton")[0].addEventListener("click", function () {
        displayAddSaleRecord();
    });*/
    document.getElementById("detailTable").style.visibility = "hidden";
    setTimeout(function () {
        if (loaded != undefined) {
            if (loaded != "") {
                displaySaleDetails(loaded);
                loaded = "";
            }
        }
    }, 250);
});

var itemList = [];

function getSaleRecords() {
    var keywords = document.getElementById("searchbar").value;
    SaleController.GetRecords(keywords, onGetSaleRecords);
}

//callback function
function onGetSaleRecords(result) {
    var sales = JSON.parse(result);
    displaySaleRecords(sales);
}

//get all model items
function getAllSearchedItems() {
    var searchInput = document.getElementById("searchbar").value;
    ModelController.SearchDatabase(searchInput, onSearchItems);
}
function onSearchItems(result) {
    items = JSON.parse(result);
    for (var i = 0; i < items.length; i++) {
        itemList.push(items[i]);
    }
}

//display a list of sales
function displaySaleRecords(sales) {
    var list = document.getElementById("list");
    while (list.hasChildNodes()) {
        list.removeChild(list.lastChild);
    }
    for (var i = sales.length - 1; i >= 0; i--) {
        var button = document.createElement("button");
        button.setAttribute("class", "listItem");
        var date = new Date(parseInt((sales[i].Date).substr(6)));
        var formatedDate = date.toString().substr(4, 11);
        button.innerHTML = "Sale #" + sales[i].SaleID + "<br/>" + formatedDate;
        let sale = sales[i];
        button.addEventListener("click", function (event) {
            document.getElementById("details").style.visibility = "visible";
            document.getElementById("detailTable").style.visibility = "visible";
            event.preventDefault();
            displaySaleDetails(sale);
        });
        list.appendChild(button);
    }
}

//display sale details
function displaySaleDetails(sale) {
    $("#addRecordButton")[0].style.visibility = "hidden";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#results")[0].style.display = "none";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTable")[0].style.visibility = "visible";

    $("#editSale")[0].addEventListener("click", function () {
        editSaleDetails(sale);
    });
    $("#sale")[0].style.backgroundColor = "white";
    /*
    var itemInputs = document.getElementsByClassName("itemInput");
    for (var i = 0; i < itemInputs.length; i++) {
        itemInputs[i].disabled = true;
    }
    */
    document.getElementById("error").innerText = "";
    var date = new Date(parseInt((sale.Date).substr(6)));

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    if (month.toString().length == 1) {
        month = "0" + month;
    }
    if (day.toString().length == 1) {
        day = "0" + day;
    }
    var format = year + "-" + month + "-" + day;
    
    var detailHeading = document.getElementById("detailHeading");
    detailHeading.innerHTML = "Sale #" + sale.SaleID;
    document.getElementById("date").value = format;
    document.getElementById("sale").value = sale.SaleID;
    document.getElementById("customer").value = sale.CustomerID;
    document.getElementById("store").value = sale.StoreID;
    document.getElementById("totalValue").value = sale.TotalValue;
    document.getElementById("discountValue").value = sale.Discount;
    document.getElementById("finalValue").value = sale.FinalTotal;

    $("#date").attr({ "disabled": "disabled" });
    $("#sale").attr({ "disabled": "disabled" });
    $("#customer").attr({ "disabled": "disabled" });
    $("#store").attr({ "disabled": "disabled" });
    $("#totalValue").attr({ "disabled": "disabled" });
    $("#discountValue").attr({ "disabled": "disabled" });
    $("#finalValue").attr({ "disabled": "disabled" });
    var items = sale.Items;

    var itemTable = document.getElementById("itemTable");
    var numberOfRows = itemTable.rows.length;
   
    if (items.length > 0 && numberOfRows >= 2) {
        $("#itemTable").find("tr:gt(0)").remove();
        for (var i = 0; i < items.length; i++) {
            insertNewRow(i);
            $(".nameInput").prop("disabled", true);
            $("#nameInput" + i).val(items[i].ItemName);
            $(".quantityInput").prop("disabled", true);
            $("#quantityInput" + i).val(items[i].Quantity);
            $(".priceInput").prop("disabled", true);
            $("#priceInput" + i).val(items[i].Price);
            $(".totalInput").prop("disabled", true);
            $("#totalInput" + i).val(items[i].Quantity * items[i].Price);
        }
    }
    else if (items.length == 0){
        $("#itemTable").find("tr:gt(1)").remove(); //delete table except the first 2 rows
        $(".itemInput").val("");    
    }
}

function displayAddSaleRecord() {
    $("#detailHeading")[0].innerHTML = "";
    $("#detailHeading")[0].innerHTML = "Add a New Sale Record";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTable")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "hidden";

    $("#itemTable").find("tr:gt(0)").remove(); //delete table except the second row
    insertNewRow(1);
    $("#sale")[0].style.backgroundColor = "lightgray";
    //$(".priceInput")[0].style.backgroundColor = "lightgray";
    $(".priceInput").prop("disabled", true);

    $("#addRecordButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";

    $(".totalInput")[0].addEventListener("keydown", addRow);

    //document.getElementById("detailTable").deleteRow(1);
    var elements = document.getElementsByTagName("input");
    for (var j = 0; j < elements.length; j++) {
        elements[j].value = "";
        var id = elements[j].id;
        if (id != "sale") {
            elements[j].disabled = false;
        }
    }
    
    $("#rightButton")[0].addEventListener("click", function () {
        clearDisplay();
    });
}

//add a new sale record
function addSaleRecord() {
    var date = document.getElementById("date").value;
    var customer = document.getElementById("customer").value;
    var store = document.getElementById("store").value;
    var total = document.getElementById("totalValue").value;
    var discount = document.getElementById("discountValue").value;
    var final = document.getElementById("finalValue").value;

    var nameInput = document.getElementsByClassName("nameInput");
    var quantityInput = document.getElementsByClassName("quantityInput");
    var priceInput = document.getElementsByClassName("priceInput");
    //there must be at least one item in a sale record
    var name = nameInput[0].value;
    var quantity = quantityInput[0].value;
    var price = priceInput[0].value;

    var check = false;
    var errorMessage = document.getElementById("error");
    if (date == "" || customer == "" || store == "" || total == "" || discount == "" || final == "" || name == "" || quantity == "" || price == "") {
        errorMessage.innerText = "Please input date, customerID, discount and at least 1 item!";
    }
    else if (!(Number(store)) || !(Number(total)) || (!(Number(discount)) && discount != 0) || !(Number(final)) || !(Number(quantity)) || !(Number(price))) {
        errorMessage.innerText = "Please input the right format!";
    }
    else {
        errorMessage.innerText = "";
        check = true;
    }
    
    if (check) {
        var listOfItems = [];
        for (var i = 0; i < nameInput.length; i++) {
            var name = nameInput[i].value;
            var amount = quantityInput[i].value;
            var unitPrice = priceInput[i].value;
            if (name != "") {
                var item = { ItemName: name, Quantity: amount, Price: unitPrice };
                listOfItems.push(item);
            }
        }
        var itemListString = JSON.stringify(listOfItems);
        SaleController.AddSaleRecord(date, customer, store, Number(total), Number(discount), Number(final), itemListString, onAddSaleRecord);
    }
}

function onAddSaleRecord(result) {
    if (result == "") {
        resultPopup("Successfully added to the database", "green");
        var elements = document.getElementsByTagName("input");
        for (var j = 0; j < elements.length; j++) {
            elements[j].value = "";
            var id = elements[j].id;
            if (id != "sale") {
                elements[j].disabled = true;
            }
        }
        clearDisplay();
        getSaleRecords();
    }
    else {
        resultPopup("Failed to add a new record to the database!", "red");
    }
}

//edit sale record
function editSaleDetails(sale) {
    $("#leftImage").attr("src", "style/save.png");
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#sale")[0].style.backgroundColor = "lightgray";

    $("#leftButton")[0].style.visibility = "visible";
    $("#addRecordButton")[0].style.visibility = "hidden";

    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        var id = elements[i].id;
        if (id != "sale") {
            elements[i].disabled = false;
        }
    }

    $("#rightButton")[0].addEventListener("click", function () {
        displaySaleDetails(sale);
    });
}

function saveSaleDetails() {
    var saleID = document.getElementById("sale").value;
    var date = document.getElementById("date").value;
    var customer = document.getElementById("customer").value;
    var storeID = document.getElementById("store").value;
    var total = document.getElementById("totalValue").value;
    var discount = document.getElementById("discountValue").value;
    var final = document.getElementById("finalValue").value;

    var nameInput = document.getElementsByClassName("nameInput");
    var quantityInput = document.getElementsByClassName("quantityInput");
    var priceInput = document.getElementsByClassName("priceInput");

    var name = nameInput[0].value;
    var quantity = quantityInput[0].value;
    var price = priceInput[0].value;
    
    var check = false;
    var errorMessage = document.getElementById("error");
    if (date == "" || customer == "" || storeID == "" || total == "" || discount == "" || final == "" || name == "" || quantity == "" || price == "") {
        errorMessage.innerText = "Please input date, customerID, discount and at least 1 item!";
    }
    else if (!(Number(storeID)) || !(Number(total)) || (discount != "0" && !(Number(discount))) || !(Number(final)) || !(Number(quantity)) || !(Number(price))) {
        errorMessage.innerText = "Please input the right format!";
    }
    else {
        errorMessage.innerText = "";
        check = true;
    }

    if (check) {
        var listOfItems = [];
        for (var i = 0; i < nameInput.length; i++) {
            var name = nameInput[i].value;
            var amount = quantityInput[i].value;
            var unitPrice = priceInput[i].value;
            if (name != "") {
                var item = { ItemName: name, Quantity: parseInt(amount), Price: parseFloat(unitPrice) };
                listOfItems.push(item);
            }
        }
        var itemListString = JSON.stringify(listOfItems);
        SaleController.EditSaleDetails(Number(saleID), date, Number(customer), Number(storeID), Number(total), Number(discount), Number(final), itemListString, onEditSaleDetails);
    }
}

function onEditSaleDetails(result) {
    if (parseJSON(result)) {
        var sale = JSON.parse(result);
        getSaleRecords();
        displaySaleDetails(sale);
        resultPopup("Successfully Edited", "green");
        $("#leftButton")[0].style.visibility = "hidden";
        $("#rightButton")[0].style.visibility = "hidden";
        var elements = document.getElementsByTagName("input");
        for (var i = 0; i < elements.length; i++) {
            var id = elements[i].id;
            if (id != "sale") {
                elements[i].disabled = true;
            }
        }
    }
    else {
        resultPopup("Failed to edit a record!", "red");
    }
}

function deleteSaleRecord() {
    var id = document.getElementById("sale").value;
    SaleController.DeleteSaleRecord(Number(id), onDeleteSaleRecord);
}

function onDeleteSaleRecord(result) {
    if (result == "") {
        clearDisplay();
        resultPopup("Sale record was successfully deleted", "green");
        $("#leftButton")[0].style.visibility = "hidden";
        $("#rightButton")[0].style.visibility = "hidden";
        getSaleRecords();
    }
}

var j = 2;
function addRow(e) {
    if (e.keyCode == 13) { // 13 is enter
        alert("Pressed!");
        insertNewRow(j);
        j++;
    }
}

function insertNewRow(index) {
    var row = document.createElement("tr");
    var name = document.createElement("td");
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("class", "itemInput nameInput");
    nameInput.setAttribute("id", "nameInput" + index);
    nameInput.setAttribute("list", "itemName" + index);
    var datalist = document.createElement("datalist");
    datalist.setAttribute("id", "itemName" + index);
    name.appendChild(nameInput);
    name.appendChild(datalist);
    
    var quantity = document.createElement("td");
    var quantityInput = document.createElement("input");
    quantityInput.setAttribute("type", "text");
    quantityInput.setAttribute("class", "itemInput quantityInput");
    quantityInput.setAttribute("id", "quantityInput" + index);
    quantity.appendChild(quantityInput);

    var price = document.createElement("td");
    var priceInput = document.createElement("input");
    priceInput.setAttribute("type", "text");
    priceInput.setAttribute("class", "itemInput priceInput");
    priceInput.setAttribute("id", "priceInput" + index);
    price.appendChild(priceInput);
    
    for (var i = 0; i < itemList.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", itemList[i].Name);
        option.setAttribute("id", i);
        datalist.appendChild(option);
        
    }
    nameInput.addEventListener("input", function () {
        var opt = $("option[value='" + $(this).val() + "']");
        var index = opt.attr("id");
        priceInput.value = itemList[index].Price;
    });

    var total = document.createElement("td");
    var totalInput = document.createElement("input");
    totalInput.setAttribute("type", "text");
    totalInput.setAttribute("class", "itemInput totalInput");
    totalInput.setAttribute("id", "totalInput" + index);
    totalInput.addEventListener("keydown", addRow);
    total.appendChild(totalInput);

    priceInput.addEventListener("input", multiply);
    quantityInput.addEventListener("input", multiply);
    function multiply() {
        var unitPrice = parseFloat(priceInput.value);
        var amount = parseInt(quantityInput.value);
        var result = unitPrice * amount;
        totalInput.value = result;
        var inputs = document.getElementsByClassName("totalInput");
        var totalValue = document.getElementById("totalValue");
        var sum = 0;
        for (var i = 0; i < inputs.length; i++) {
            sum += parseFloat(inputs[i].value);
        }
        totalValue.value = sum;
        var discount = document.getElementById("discountValue");
        var finalTotal = document.getElementById("finalValue");
        finalTotal.value = parseFloat(totalValue.value) - parseFloat(discount.value);
        discount.addEventListener("input", function () {
            finalTotal.value = parseFloat(totalValue.value) - parseFloat(discount.value)
        });
    }
    row.appendChild(name);
    row.appendChild(quantity);
    row.appendChild(price);
    row.appendChild(total);
    itemTable.appendChild(row);
}

function deleteRow() {
    var nameInput = document.getElementsByClassName("nameInput");
    var totalValue = document.getElementById("totalValue");
    var discount = document.getElementById("discountValue");
    var finalTotal = document.getElementById("finalValue");
    for (var i = 0; i < nameInput.length; i++) {
        nameInput[i].addEventListener("input", checkValue);
        function checkValue() {
            if (this.value == "") {
                var totalInput = document.getElementsByClassName("totalInput");
                var sum = 0;

                var id = (this.id).substr(9, 10);
                var price = document.getElementById("priceInput" + id);
                var quantity = document.getElementById("quantityInput" + id);
                var total = document.getElementById("totalInput" + id);
                price.value = 0;
                quantity.value = 0;
                total.value = 0;

                for (var j = 0; j < totalInput.length; j++) {
                    sum += parseFloat(totalInput[j].value);
                }
                totalValue.value = sum;
                finalTotal.value = sum - parseFloat(discount.value);
            }
        }

    }
}

// removes any details that are displayed in the details section
function clearDisplay() {
    $("#detailContainer")[0].style.visibility = "hidden";
    $("#detailHeading")[0].style.visibility = "hidden";
    $("#details")[0].style.visibility = "hidden";
    $("#detailOptions")[0].style.visibility = "hidden";
    $("#detailTable")[0].style.visibility = "hidden";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#addRecordButton")[0].style.visibility = "hidden";
}

function displayConfirmDelete() {
    $("#results")[0].style.borderColor = "red";
    $("#results")[0].style.display = "block";
    $("#results")[0].innerHTML = "";

    var br = document.createElement("br");

    var button1 = document.createElement("button");
    button1.setAttribute("type", "button");
    button1.setAttribute("title", "Delete");
    button1.style.cssFloat = "left";
    button1.setAttribute("class", "mediumbtn greenbtn");
    button1.addEventListener("click", function () {
        //deleteItem(item.Id);
        deleteSaleRecord();
    });
    var img1 = document.createElement("img");
    img1.src = "style/delete.png";
    button1.append(img1);
    button1.append("Delete");

    var button2 = document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("title", "Cancel");
    button2.style.cssFloat = "right";
    button2.setAttribute("class", "mediumbtn redbtn");
    button2.addEventListener("click", function () {
        closeDelete();
    });
    var img2 = document.createElement("img");
    img2.src = "style/close.png";
    button2.append(img2);
    button2.append("Cancel");

    $("#results")[0].append("Are you sure you want to delete this model ");
    var span = document.createElement("span");
    span.style.fontWeight = "bold";
    span.append("permanently");
    $("#results")[0].append(span);
    $("#results")[0].append(" from the database?");
    $("#results")[0].append(br);
    $("#results")[0].append(br);
    $("#results")[0].append(button1);
    $("#results")[0].append(button2);
}

// closes the delete prompt
function closeDelete() {
    results.style.display = "none";
}

//Advanced search display
function displayAdvSearch() {
    /*document.getElementById("detailHeading").innerHTML = "Advanced Search";
    document.getElementById("details").innerHTML = "Here will be filter & sort settings for an advanced search!";*/
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailHeading")[0].innerHTML = "Advanced Search";
}

function restore() {
    $('#detailTable').find(':input').each(function (i, elem) {
        $(this).val($(this).data("previous-value"));
    });
}

function parseJSON(jsonString) {
    try {
        var obj = JSON.parse(jsonString);
        if (obj && typeof obj === "object")
            return obj;
    }
    catch (e) { }
    return false;
}