/**
 * vision.js
 * 공통적인 변수 및 함수 관리
 */

var isAdmin = false;

/**
 * 각 페이지에 있는 이미지를 변경요청하는 function
 * @param pageId
 * @param imgId
 */
function requestChangeImg(pageId, imgId, imgPath){
	console.log('pageId:' + pageId + ' imgId:' + imgId + ' imgPath:' + imgPath);
	if( pageId!=null && pageId!=''&&imgId!=null&&imgId!=''){
		$('#inputPageId').val(pageId);
		$('#inputImgId').val(imgId);
		$('#inputImgPath').val(imgPath);
		return true;
	} else {
		alert('페이지번호와 이미지번호는 필수입니다');
		return false; 
	}
}

/**
 * 특수문자 체크
 * @param string
 * @returns {Boolean}
 */
function checkStringFormat(string) { 
	//var stringRegx=/^[0-9a-zA-Z가-힝]*$/; 
	var stringRegx = /[~!@\#$%<>^&*\()\-=+_\’]/gi; 
	var isValid = true; 
	if(stringRegx.test(string)) { 
		isValid = false; 
	} 
	return isValid; 
}


/**
 * 정규식을 사용하여 문자열을 바꿔준다
 * @param a 바꿀문자
 * @param b 이걸로 바꿔
 */
function replaceAll(a, b){
	replace('/'+a+'/gi',b);
}

/**
 * 필수항목 체크
 * @param $targetForm
 * @returns 필수항목 모두 입력 여부
 */
function checkRequiredInputs($targetForm){
	var $requiredInputs = $("input[required],textarea[required],select[required],checkbox[required]", $targetForm);
	//console.log($requiredInputs);
	for(var i=0; i<$requiredInputs.length; i++){
		var $currentInput = $($requiredInputs[i]);
		//console.log(i + ":" + $currentInput.val());
		if($currentInput.val()==""){
			console.log($currentInput);
			//alert( $currentInput.parent().prev().text()+"을(를) 입력해주십시오" ); // Label
			var $label = $currentInput.closest("label");
			if($label=="" || $label.length<1){
				$label = $currentInput.prevAll("label");

				if($label=="" || $label.length<1){
					var inputId = $currentInput.attr("id");
					$label = $("label[for='"+inputId+"']");
				}
			}

			alert( $label.text()+"을(를) 입력해주십시오" );
			//$currentInput.triggerHandler("focus");
			console.log($currentInput);
			return false;
		}
	}
	return true;
}

/**
 * Page.tag에서 page를 찾아 갈 때와 게시물의 검색에 사용되는 함수들
 * @param page
 */
/*
var $searchForm = $("form[name='searchForm']");

function goPage(page){
	resetCurrentPage(page);
	$searchForm.submit();
}

function resetCurrentPage(page){
	("input[name='currentPage']", $searchForm).val(page);
}
*/

var searchForms = document.getElementsByName("searchForm");

function goPage(page){
	if(searchForms.length>0){
		resetCurrentPage(page);
		searchForms[0].submit();
	}
}

function resetCurrentPage(page){
	if(searchForms.length>0){
		searchForms[0].currentPage.value = page;
	}
}

/**
 * Class Util Class for javascript object 
 */
var ClassUtil = {
    create: function(prototype) {
        var ret =function() {
            this.__construct.apply(this, arguments);
        }
        ret.prototype=prototype;
        return ret;
    }
}

/**
 * Obserbable
 */
var obserbable = function(newVal) {
	var val = 0;
	var listeners = [];
	
	function notify(newVal){
		listeners.forEach(function(listener)){
			listener(newVal);
		}
	}
	
	function accessor(newVal){
		if(arguents.length && newVal!=val){
			val = newVal;
			notify(val);
		}
		return val;
	}
	
	accessor.subscribe = function(listener){
		listeners.push(listener);
	}
	
	return accessor;
}
// 
