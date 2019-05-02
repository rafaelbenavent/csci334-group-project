﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SalesView.aspx.cs" Inherits="HobbyShop.SalesView" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
	    <meta content="utf-8" http-equiv="encoding"/>
        <title> Sales - Tim's Sale Records</title>
	    <link rel="stylesheet" href="style/details.css"/>
        <link rel="stylesheet" href="style/list.css" />
        <script type="text/javascript" src="js/sales.js"></script>
</head>
<body>
    <div id="listContainer">
        <table id="searchHead">
            <tr>
                <td>
                    <input type="text" id="searchbar" placeholder="Search Sales..." />
                </td>
                <td class="searchBarBtn">
                    <button type="button" id="advSearch" class="smallbtn" title="Advanced search">
                            <img src="style/options.png" /></button>
                </td>
            </tr>
        </table>
        <div class="scrollable" id="list"></div>
        <div id="addButtonContainer">
            <button type="button" id="addButton" class='smallbtn greenbtn' title="Add Sale"><img src='style/add.png' /></button>
        </div>
    </div>
	<div id="detailContainer">
        <div class="scrollable" style="width:100%;">
            <h3 id="detailHeading"></h3>
            <div id="detailOptions" class="dropdown">
                <button type="button" class="smallbtn"> <img src="style/options.png" /></button>
                 <div class="dropdown-content">
                     <button type="button" class="dropdown-button" id="editSale">Edit Details</button>
                     <button type="button" class="dropdown-button" id="deleteSale">Delete Sale</button>
                 </div> 
             </div>
            <div id="details">
                <table id="detailTable">
                    <tr> 
                        <td id="firstcell"> Sale date: </td> 
                         <td id="saleDate"></td> 
                    </tr> 
                    <tr> 
                        <td> Sale ID </td> 
                        <td id="saleID"></td> 
                    </tr> 
                    <tr> 
                        <td> Total: </td> 
                        <td id="total"></td> </tr> 
                    <tr> 
                        <td> Discount: </td> 
                        <td id="discount"></td> 
                    </tr>
                    <tr> 
                        <td> Final Total: </td> 
                        <td id="final"></td> 
                    </tr> 
                </table>
                <button type="button" id="leftButton" title="Save changes" class="smallbtn greenbtn"> 
                </button>
                <button type="button" id="rightButton" title="Discard changes" class="smallbtn redbtn" style="float:right;"> 
                    <img src="style/close.png" />
                </button>
            </div>
        </div>
	</div>
    <form id="form1" runat="server">
            <asp:scriptmanager runat="server">
                <Services>
                    <asp:ServiceReference Path="~/CONTROLLER/SaleController.svc" />
                </Services>
            </asp:scriptmanager>
        </form>
</body>
</html>
