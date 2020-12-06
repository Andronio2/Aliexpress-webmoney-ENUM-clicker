// ==UserScript==
// @name         WebMoney E-NUM clicker
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Вводит WMId и пароль на WebMoney
// @author       Andronio
// @homepage     https://github.com/Andronio2/Aliexpress-webmoney-ENUM-clicker/
// @supportURL   https://github.com/Andronio2/Aliexpress-webmoney-ENUM-clicker/issues
// @updateURL    https://github.com/Andronio2/Aliexpress-webmoney-ENUM-clicker/blob/main/WebMoney%20E-NUM%20clicker.user.js
// @downloadURL  https://github.com/Andronio2/Aliexpress-webmoney-ENUM-clicker/blob/main/WebMoney%20E-NUM%20clicker.user.js
// @match        https://merchant.web.money/lmi/payment_conf.asp
// @match        https://merchant.web.money/lmi/SignedLoginFormNewWC.asp*
// @match        https://merchant.web.money/lmi/payment_do.asp
// @match        https://merchant.wmtransfer.com/lmi/payment_conf.asp
// @match        https://merchant.wmtransfer.com/lmi/SignedLoginFormNewWC.asp*
// @match        https://merchant.wmtransfer.com/lmi/payment_do.asp
// @match        https://psp.wmtransfer.com/payment/process/*
// @match        https://psp.web.money/payment/process/*
// @match        https://shoppingcart.aliexpress.com/order/payResult.htm?cashierRequestNo*
// @grant        none
// ==/UserScript==
(function repeat() {
    'use strict';
/********************
 * Начало настроек
 *******************/


let mwIdVal = "000000000000";
let wmPassVal = "000000000";


/********************
 * Дальше не трогать
 ********************/

    let href = window.location.href;
    if (href.startsWith("https://merchant.wmtransfer.com/lmi/payment_conf.asp") || href.startsWith("https://merchant.web.money/lmi/payment_conf.asp")) {
        let enumCode = document.getElementById("ConfirmENum");
        let confirmButton = document.getElementById("do_payment");
        let askENUM = document.getElementById("ConfirmENumSend");

        if (askENUM) askENUM.click();
        if (!enumCode) {
            setTimeout(repeat, 500);
        } else {
            if (enumCode.value == ""){
            // Запуск таймера
            setTimeout(repeat, 500);
            } else {
                confirmButton.click();
            }
        }
    }
    if (href.startsWith("https://psp.wmtransfer.com/payment/process/") || href.startsWith("https://psp.web.money/payment/process/")) {
        let returnButton = document.getElementById("returnToMerchant");
        if (!returnButton) {
            setTimeout(repeat, 500);
        } else {
            if (returnButton.clientWidth == 0) {
                setTimeout(repeat, 500);
            } else {
                    returnButton.click();
            }
        }
    }
    if (href.startsWith("https://merchant.wmtransfer.com/lmi/SignedLoginFormNewWC.asp") || href.startsWith("https://merchant.web.money/lmi/SignedLoginFormNewWC.asp")) {
        let wmId = document.getElementById("wmcheck_no");
        let wmPass = document.getElementById("wmcheck_pwd");
        let wmCapt = document.getElementById("mobilecaptcha");
        let wmAuth = document.getElementById("auth");

        if (wmId && wmPass) {
            if (wmPass.parentNode.parentNode.classList.contains('js-hidden')) {
                if (wmId.value == "") {
                    wmId.value = mwIdVal;
                    wmCapt.focus();
                }
                setTimeout(repeat, 500);
            } else {
                if (wmPass.value == "") {
                    wmPass.value = wmPassVal;
                    if (wmId.value == "") {
                        wmId.value = mwIdVal;
                        wmCapt.focus();
                    }
                }
                if (wmCapt.value != "") wmAuth.click();
            }
        } else {
            setTimeout(repeat, 500);
        }
    }
    if (href.startsWith("https://merchant.wmtransfer.com/lmi/payment_do.asp") || href.startsWith("https://merchant.web.money/lmi/payment_do.asp")) {
        let backButton = document.getElementById("back_toshop");
        if (backButton) {
            backButton.click();
        } else {
            setTimeout(repeat, 500);
        }
    }
    if (href.startsWith("https://shoppingcart.aliexpress.com/order/payResult.htm")) {
        let mybtn = document.querySelectorAll(".operation-container > .next-btn-primary")

        if (mybtn.length != 0) {
            mybtn[1].click();
        } else {
            setTimeout(repeat, 500);
        }
    }
})();
