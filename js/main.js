
const elementWidth1 = document.querySelector('.input-width-1');
const elementWidth2 = document.querySelector('.input-width-2');
const elementHeight1 = document.querySelector('.input-height-1');
const elementHeight2 = document.querySelector('.input-height-2');
const elementResult = document.querySelector('.result');
elementWidth1.focus();


function calculatingAspectRatio(width, height) {
    return (height == 0) ? width : calculatingAspectRatio(height, width % height);
}

function gcd(a, b){
    if (a == 0 || b == 0){
        return a + b;
    }
    while (a != b){
        if (a > b){
            a -= b; // a = a - b
        }else{
            b -= a;
        }
    }
    return a; 
}

const validation = {
    isRequired: function(selector, classInvalid, message = "The field is required"){
        if(selector){
            let isEmpty = selector.value || selector.value.trim() ? true : false;
            let elementInvalid = selector.parentElement.querySelector(classInvalid);
            if(elementInvalid){
                if(isEmpty){
                    elementInvalid.style.display = "none";
                    elementInvalid.innerHTML = "";
                    return true;
                }else{
                    elementInvalid.style.display = "block";
                    elementInvalid.innerHTML = message;
                    return false;
                }
            }
        }
    },
    isNumber: function(selector, classInvalid, message = "Please enter only number") {
       if(selector){
           let regex = /^[0-9]*$/;
           let isNumber = regex.test(selector.value);
           let elementInvalid = selector.parentElement.querySelector(classInvalid);
           if(elementInvalid){
                if(isNumber){
                    elementInvalid.style.display = "none";
                    elementInvalid.innerHTML = "";
                    return true;
                }else{
                    elementInvalid.style.display = "block";
                    elementInvalid.innerHTML = message;
                    return false;
                }
           }
       }
    },
    
    isCheckHandleValidation: function(selector){
        let isTrue = validation.isRequired(selector, ".invalid-feedback");
        isTrue ? isTrue = validation.isNumber(selector, ".invalid-feedback", "Please enter only number") : isTrue;
        return isTrue;
    }
}

function handleBlur(selector){
    if(selector){
        selector.addEventListener("blur", function(e){
            if(validation.isCheckHandleValidation(e.target)){
                if(selector.closest(".input-width-1")){
                    if(validation.isCheckHandleValidation(elementHeight1)){
                        let result = calculatingAspectRatio(elementWidth1.value, elementHeight1.value);
                        elementResult.textContent = `${elementWidth1.value / result} : ${elementHeight1.value / result}`;

                        calculatingNewWidthOrHeight();
                    }
                }else if(selector.closest(".input-height-1")){
                    if(validation.isCheckHandleValidation(elementWidth1)){
                        let result = calculatingAspectRatio(elementWidth1.value, elementHeight1.value);
                        elementResult.textContent = `${elementWidth1.value / result} : ${elementHeight1.value / result}`;

                        calculatingNewWidthOrHeight()
                    }
                }else if(selector.closest(".input-width-2")){
                    if(validation.isCheckHandleValidation(elementHeight1)){
                        elementHeight2.value = formulaNewWidthOrHeight(elementHeight1.value, elementWidth1.value, elementWidth2.value);
                    }
                }else if(selector.closest(".input-height-2")){
                    if(validation.isCheckHandleValidation(elementHeight1)){
                        elementWidth2.value = formulaNewWidthOrHeight(elementHeight1.value, elementWidth1.value, elementHeight2.value);
                    }
                }
            }else{
                if(selector.closest(".input-height-1") || selector.closest(".input-width-1")){
                    elementHeight2.value = "";
                    elementWidth2.value = "";
                    elementResult.textContent = `-`;
                }
                if(selector.closest(".input-width-2")){
                    elementHeight2.value = "";
                }else if(selector.closest(".input-height-2")){
                    elementWidth2.value = "";
                }
            }
        })
    }
}
function calculatingNewWidthOrHeight(){
    if(elementWidth2.value){
        elementHeight2.value = formulaNewWidthOrHeight(elementHeight1.value, elementWidth1.value, elementWidth2.value);
    }else if(elementHeight2.value){ 
        elementWidth2.value = formulaNewWidthOrHeight(elementHeight1.value, elementWidth1.value, elementHeight2.value);
    }
}

function formulaNewWidthOrHeight(height, width, value){
    return ((height / width) * value).toFixed(0);
}

if(elementWidth1 && elementHeight1){
    handleBlur(elementWidth1);
    handleBlur(elementHeight1);
    handleBlur(elementWidth2);
    handleBlur(elementHeight2);
}

