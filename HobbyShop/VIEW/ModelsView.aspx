﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ModelsView.aspx.cs" Inherits="HobbyShop.ModelsView" %>
﻿<!DOCTYPE>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
	    <meta content="utf-8" http-equiv="encoding"/>
        <title> Models - Tim's Model Market </title>
	    <link rel="stylesheet" href="style/details.css"/>
        <link rel="stylesheet" href="style/list.css" />
        <script type="text/javascript" src="js/models.js"></script>
    </head>
    <body>
        <div id="listContainer">
            <table id="searchHead">
                <tr>
                    <td>
                        <input type="text" id="searchbar" placeholder="Search Models..." />
                    </td>
                    <td class="searchBarBtn">
                        <button type="button" id="advSearch" class="smallbtn" title="Advanced search"><img src="style/options.png" /></button>
                    </td>
                </tr>
            </table>
            <div class="scrollable" id="list"></div>
            <div id="addButtonContainer">
                <button type="button" id="addButton" class='smallbtn greenbtn' title="Add Model"><img src='style/add.png' /></button>
            </div>
        </div>
		<div id="detailContainer">
            <h3 id="detailHeading"></h3>
            <div id="detailOptions" class="dropdown">
                <button type="button" class="smallbtn"> <img src="style/options.png" /></button>
                <div class="dropdown-content">
                    <button type="button" class="dropdown-button" id="editItem">Edit Details</button>
                    <button type="button" class="dropdown-button" id="deleteItem">Delete Item</button>
                </div> 
            </div>
            <div id="detailTabBar">
                <button type="button" class="tab detailtab active" id="detailsTab">Details</button>
                <button type="button" class="tab detailtab" id="storesTab">Stores</button>
                <button type="button" class="tab detailtab" id="suppliersTab">Suppliers</button>
            </div>
            <div id="details" class="detailTabContent">
                <div class="scrollable">
                    <table id="detailTable">
                        <tr> 
                            <td id="firstcell"> Name </td> 
                            <td id="itemName"><input type="text" id="itemNameInput" disabled/></td> 
                        </tr> 
                        <tr> 
                            <td> ID </td> 
                            <td id="itemID"></td> 
                        </tr> 
                        <tr> 
                            <td> Type </td> 
                            <td id="itemType">
                                <input type="text" id="itemTypeInput" list="types" disabled/>
                                <datalist id="types">
                                </datalist>
                            </td> 
                        </tr> 
                        <tr> 
                            <td> Subject Area </td> 
                            <td id="itemSbjArea">
                                <input type="text" id="itemSbjAreaInput" list="subjects" disabled/>
                                <datalist id="subjects"></datalist>
                            </td> 
                        </tr>
                        <tr> 
                            <td> Price </td> 
                            <td id="itemPrice"><input type="number" id="itemPriceInput" disabled/></td> 
                        </tr> 
                        <tr> 
                            <td> Description </td> 
                            <td id="itemDescription"><textarea id="itemDescriptionInput" disabled/></td> 
                        </tr> 
                        <tr> 
                            <td> Availability </td> 
                            <td id="itemAvailability"><input type="checkbox" id="itemAvailabilityInput" disabled/></td> 
                        </tr> 
                        <tr> 
                            <td> Total Stock </td> 
                            <td id="itemTotalStock"></td> 
                        </tr>
                    </table>
                    <button type="button" id="leftButton" title="Save changes" class="smallbtn greenbtn"> 
                    </button>
                    <button type="button" id="rightButton" title="Discard changes" class="smallbtn redbtn" style="float:right;"> 
                        <img src="style/close.png" />
                    </button>
                </div>
            </div>
            <div class ="detailTabContent">
                <div id="stores" class="scrollable">
                </div>
            </div>
            <div class ="detailTabContent">
                <div id="suppliers" class="scrollable">
                </div>
            </div>
		</div>
        <form id="form1" runat="server">
            <asp:scriptmanager runat="server">
                <Services>
                   <asp:ServiceReference Path="~/CONTROLLER/ModelController.svc" />
                </Services>
            </asp:scriptmanager>
        </form>
    </body>
</html>
