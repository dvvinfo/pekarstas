var $window = $(window),
    $document = $(document),
    $html = $('html'),
    $body = $('body');

var pekarstas = {
    init: function () {
        this.search.init();
        this.popup.init();
        this.mainMenu.init();
        this.tabs.init();
        this.select.init();
        this.user_menu.init();
        this.notification_scroll.init();
        this.header_notifications.init();
        this.main_page_menu.init();
        this.accordion.init();
        this.slide_toggle.init();
        this.list_toggle.init();
        this.state_toggle.init();
        this.delegate.init();
        this.hm2_order.init();
        this.masonry.init();
        this.owl_slider.init();
        this.scroll.init();
        this.scroll_top.init();
        this.scroll_to.init();
        this.room_fixed.init();
        this.education_faq.init();
        this.rooms_filter.init();
        this.show_all.init();
        this.circle_percent.init();
        this.video_pro.init();
        this.question_switch.init();
        this.data_filter.init();
        this.favorite.init();
        this.comments.init();
        this.room_content.init();
        this.post_list.init();
        this.rooms_list.init();
        this.room_reviews_reply.init();
        this.landing_pro.init();
        this.landing_vip_levels.init();
        this.popover.init();
        this.new_ckeditor.init();
    },

    room_reviews_reply: {
        init: function () {
            document.querySelectorAll('.comments-item__body-reply').forEach(function (el, i) {
                el.addEventListener("click", function () {
                    document.getElementById(`comment_room_reply_form_${i}`).classList.toggle('_active');
                });
            });
        }
    },

    search: {
        init: function () {
            this.addEvents();
        },
        addEvents: function () {
            $body.on('click', '[data-search_trigger]', function () {
                var $container = $(this).parents('.search-result__container');
                if (!$('input[type="text"]', $container).val().trim().length) {
                    $container.removeAttr('data-active');
                    $('.search-result', $container).removeAttr('data-show');
                    return;
                }
                $container.attr('data-active', '');
                $('.search-result', $container).attr('data-show', '');
            }).on('click', '[data-search_clear]', function () {
                var $container = $(this).parents('.search-result__container');
                $('input[type="text"]', $container).val('');
                $container.removeAttr('data-active');
                $('.search-result', $container).removeAttr('data-show');
            }).on("click", function (e) {
                if ($(e.target).closest('.search-result__container').length) return;
                $('.search-result').removeAttr('data-show');
            });
        }
    },

    popup: {
        init: function () {
            var self = this;

            this.$popup_trigger = $("[data-popup_open]");
            this.$popup = $(".popup");
            this.$popup_trigger_close = $("[data-popup_close]");
            this.open_popup_name = null;

            this.$popup_trigger.on("click", function (e) {
                e.preventDefault();
                self.openPopup($(this).data("popup_open"));
            });

            this.$popup_trigger_close.on("click", function (e) {
                e.preventDefault();
                self.closePopup();
            });

            $window.on("keydown", function (e) {
                if (e.keyCode === 27) {
                    self.closePopup();
                }
            });
        },
        openPopup: function (popup) {
            this.open_popup_name = popup;
            this.$popup.hide().filter("[data-popup_name='" + popup + "']").show();
            $body.addClass("_popup");
            $html.removeClass("_show-menu");
        },
        closePopup: function () {
            if (this.open_popup_name === 'fav_remove') {
                
             }
            else {
                $body.removeClass("_popup");
                this.$popup.hide();
                if (this.open_popup_name === 'room_rate') pekarstas.circle_percent.closePopup();
                this.open_popup_name = null;
            };
        }
    },

    mainMenu: {
        init: function () {
            this.menuTrigger = '[data-menu_trigger]';
            this.searchTrigger = '[data-search_popup]';
            this.$popup_menu_part = $('.popup-menu-part');
            this.addEvents();
        },
        addEvents: function () {
            $body.on('click', this.menuTrigger, function (e) {
                e.preventDefault();
                if ($html.hasClass('_show-notifications')) {
                    $html.removeClass('_show-notifications _show-menu');
                    $body.removeClass('_menu');
                    return;
                }
                if ($body.hasClass('_menu')) {
                    $html.removeClass('_show-menu');
                    $body.removeClass('_menu');
                } else {
                    $html.addClass('_show-menu');
                    $body.addClass('_menu');
                }
            });

            $body.on('click', this.searchTrigger, function (e) {
                e.preventDefault();
                $body.toggleClass('_search');
            });

            $body.on("click", function (e) {
                if (!$(e.target).closest('[data-menu_trigger]').length && !$(e.target).closest('.popup-menu__body').length) {
                    $html.removeClass('_show-menu');
                    $body.removeClass('_menu');
                }
            });

            $window.on("keydown", function (e) {
                if (e.keyCode === 27) {
                    $html.removeClass('_show-menu');
                    $body.removeClass("_menu");
                }
            });

            this.$popup_menu_part.on("mouseenter", function () {
                if ($window.width() < 641) return;
                $(this).click();
            });
        }
    },

    tabs: {
        init: function () {
            var self = this;

            this.$tab_trigger = $("[data-tab_trigger]");
            this.$landing_tab_arrow = $(".landing-tab_arrow");
            this.$landing_tab_pic_item = $(".landing-tab-pic_item");
            this.$landing_school_content_summary_next = $(".landing-school-content_summary_next");

            this.$tab_trigger.on("click", function () {
                var $this = $(this),
                    tab_container = $this.data("tab_container");
                console.log($this, tab_container);
                console.log('triggered');

                if ($this.hasClass("_active")) return;
                $this.addClass("_active").siblings().removeClass("_active");

                if (tab_container === undefined) return;
                var $tab_container,
                    tab_container_is_parent = false,
                    tab_container_is_direct = false;
                if (tab_container[0] === '>') {
                    tab_container_is_parent = true;
                    tab_container = tab_container.slice(1);
                }
                if (tab_container.substr(-1) === '>') {
                    tab_container_is_direct = true;
                    tab_container = tab_container.slice(0, -1);
                }
                tab_container = '.' + tab_container;
                if (tab_container_is_parent) {
                    $tab_container = $this.parents(tab_container);
                } else {
                    $tab_container = $(tab_container);
                }
                var $tab_content_group;
                if (tab_container_is_direct) {
                    $tab_content_group = $('> [data-tab_content-group]', $tab_container);
                } else {
                    $tab_content_group = $('[data-tab_content-group]', $tab_container);
                }
                var $tab_content = $('[data-tab_content]', $tab_container),
                    index = $this.index();

                if ($tab_content_group.length) {
                    $tab_content_group.each(function () {
                        $tab_content = $('> [data-tab_content]', $(this));
                        $tab_content.removeClass("_active").filter(":eq(" + index + ")").addClass("_active");
                    });
                } else {
                    $tab_content.removeClass("_active").filter(":eq(" + index + ")").addClass("_active");
                }

                pekarstas.runOwnFunction($this.data("run_after"));
            });

            this.$landing_tab_arrow.on("click", function () {
                var $this = $(this),
                    $tabs = $this.parent().find("[data-tab_trigger]"),
                    cur_index = $tabs.filter("._active").index();

                if ($this.hasClass("_right")) {
                    cur_index++;
                } else {
                    cur_index--;
                }
                if (cur_index < 0) {
                    cur_index = 0;
                }

                $tabs.filter(":eq(" + cur_index + ")").click();
            });

            this.$landing_tab_pic_item.on("click", function () {
                self.$tab_trigger.filter('[data-tab_container="landing-school"]:eq(' + $(this).parents(".column-layout_item").index() + ')').click();
            });

            this.$tab_trigger.filter('[data-tab_container="landing-school"]').on("click", function () {
                self.$landing_tab_pic_item.removeClass("_active").eq($(this).index()).addClass("_active");
            });

            this.$landing_school_content_summary_next.on("click", function () {
                self.$tab_trigger.filter('[data-tab_container="landing-school"]._active').next().click();
            });
        }
    },

    select: {
        init: function () {
            var self = this;

            this.$unit_select = $(".unit-select");
            this.unit_select_text = $(".unit-select_text");
            this.unit_droplist = $(".unit-droplist");
            this.unit_droplist_title = $(".unit-droplist-title");

            this.unit_select_text.on("click", function () {
                var $parent = $(this).parents(".unit-select");

                self.$unit_select.not($parent).removeClass("_active").removeAttr('data-focus');
                $parent.toggleClass("_active").attr('data-focus', '');
            });

            $('.unit-select_list_item[default-active]')[0] && setTimeout(() => {
                $('.unit-select_list_item[default-active]')[0].click()
            }, 100);

            $body.on("click", ".unit-select_list_item", function () {
                var $this = $(this),
                    $parent = $this.parents(".unit-select");

                $(".unit-select_list_item", $parent).removeAttr('data-active').filter(this).attr('data-active', '');
                $(".unit-select_input", $parent).val($this.data("val"));
                $(".unit-select_text", $parent).html($this.html());
                $(".unit-select_text", $parent).addClass("_filled");
                $parent.removeClass("_active");
            });

            this.unit_droplist_title.on("click", function () {
                $(this).parents(".unit-droplist").toggleClass("_active");
            });

            $(".unit-droplist-list_item").on("click", function () {
                $(this).parents(".unit-droplist").toggleClass("_active");
            });

            $body.on("click", function (e) {
                if (!$(e.target).closest(self.$unit_select).length) {
                    self.$unit_select.removeClass("_active").removeAttr('data-focus');
                }

                if (!$(e.target).closest(self.unit_droplist).length) {
                    self.unit_droplist.removeClass("_active");
                }
            });
        }
    },

    user_menu: {
        init: function () {
            var self = this;

            this.$unit_select = $(".header-user");
            this.$unit_select_avatar = $(".unit-avatar", this.$unit_select);

            this.$unit_select_avatar.on("click", function () {
                self.$unit_select.toggleClass("_active");
            });

            $body.on("click", function (e) {
                if (!$(e.target).closest(self.$unit_select).length) {
                    self.$unit_select.removeClass("_active");
                }
            });
        }
    },

    notification_scroll: {
        init: function () {
            $(window).on("scroll", function () {
                if ($(window).scrollTop() > 160) {
                    $('.notification-list').addClass('_fixed');
                } else if ($(window).scrollTop() < 160) {
                    $('.notification-list').removeClass('_fixed');
                } else {
                    $('.notification-list').removeClass('fixed');
                }
            });
        }
    },

    header_notifications: {
        init: function () {
            var self = this;

            this.$header_notifications = $(".header-notifications");
            this.$header_notifications_trigger = $(".header-notifications-trigger", this.$header_notifications);
            this.$header_notifications_checkbox = $("input[type='checkbox']", this.$header_notifications);
            this.$header_notifications_checkbox_all_toggle = this.$header_notifications_checkbox.filter("[name='all_toggle']");
            this.$header_notifications_checkbox_set = this.$header_notifications_checkbox.not("[name='all_toggle']");

            this.$header_notifications_trigger.on("click", function (e) {
                e.preventDefault();
                if (self.$header_notifications.hasClass('_active')) {
                    $html.removeClass('_show-notifications');
                    self.$header_notifications.removeClass("_active");
                } else {
                    $html.addClass('_show-notifications');
                    self.$header_notifications.addClass("_active");
                    $window.scrollTop(0);
                }
            });

            $body.on("click", function (e) {
                if (!$(e.target).closest(self.$header_notifications).length) {
                    $html.removeClass('_show-notifications');
                    self.$header_notifications.removeClass("_active");
                }
            });

            this.$header_notifications_checkbox_all_toggle.on("change", function () {
                self.$header_notifications_checkbox_set.prop("checked", this.checked).attr("checked", this.checked);
            });

            this.$header_notifications_checkbox_set.on("change", function () {
                var checked = false;

                if (this.checked && self.$header_notifications_checkbox_set.length === self.$header_notifications_checkbox_set.filter(":checked").length) {
                    checked = true;
                }
                self.$header_notifications_checkbox_all_toggle.prop("checked", checked).attr("checked", checked);
            });
        }
    },

    main_page_menu: {
        init: function () {
            this.$main_page_menu = $(".main-page-menu");
            if (!this.$main_page_menu.length) return;
            this.$main_page_menu_button = $(".main-page-menu__button", this.$main_page_menu);
            this.$main_page_menu_checkbox = $("input[type='checkbox']", this.$main_page_menu);
            this.$main_page_menu_wrap = $(".main-page-menu__wrap", this.$main_page_menu);
            this.$main_page_menu_item = $(".main-page-menu__item", this.$main_page_menu);
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            this.$main_page_menu_button.on("click", function () {
                self.togglePopup();
            });

            this.$main_page_menu_item.on("click", function (e) {
                e.preventDefault();
                self.scrollMenu($(this));
            });

            $body.on("click", function (e) {
                if (!$(e.target).closest(self.$main_page_menu).length) {
                    self.closePopup();
                }
            });

            this.$main_page_menu_checkbox.on("change", function () {
                if (!self.$main_page_menu_checkbox.filter(":checked").length) {
                    $(this).prop("checked", true).attr("checked", true);
                }
            });
        },
        togglePopup: function () {
            (this.$main_page_menu.attr('data-popup') === undefined)
                ? this.openPopup() : this.closePopup();
        },
        openPopup: function () {
            if (this.$main_page_menu.attr('data-popup') !== undefined) return;
            this.$main_page_menu.attr('data-popup', '');
        },
        closePopup: function () {
            if (this.$main_page_menu.attr('data-popup') === undefined) return;
            this.$main_page_menu.removeAttr('data-popup');
        },
        scrollMenu: function ($item) {
            if ($window.width() > 640) return;
            this.$main_page_menu_wrap.scrollLeft(0);
            this.$main_page_menu_wrap.scrollLeft($item.offset().left - 70);
        }
    },

    accordion: {
        init: function () {
            $body.on('click', '.unit-accordion__title', function () {
                var $title = $(this),
                    $parent = $title.parent(),
                    $accordion_body = $parent.find('.unit-accordion__body');

                if ($parent.attr('data-expand') === '') {
                    $parent.removeAttr('data-expand');
                    $accordion_body.show().slideUp('fast');
                } else {
                    $parent.attr('data-expand', '');
                    $accordion_body.hide().slideDown('fast');
                }
            });
        }
    },

    slide_toggle: {
        init: function () {
            $body.on('click', '[data-slide_toggle]', function (e) {
                e.preventDefault();
                var $this = $(this),
                    $container = $body;
                if ($this.attr('data-slide_container') !== undefined && $this.attr('data-slide_container').length) {
                    $container = $this.parents($this.attr('data-slide_container'));
                }
                var $toggle = $('[data-slide_toggle="' + $this.attr('data-slide_toggle') + '"]', $container),
                    $target = $($this.attr('data-slide_toggle'), $container);

                if ($target.attr('data-status') === 'show') {
                    $toggle.attr('data-status', 'hide');
                    $target.attr('data-status', 'hide').show().slideUp('fast');
                } else {
                    $toggle.attr('data-status', 'show');
                    $target.attr('data-status', 'show').hide().slideDown('fast');
                }
            });
        }
    },

    list_toggle: {
        init: function () {
            this.$lists = $('[data-list]');
            if (!this.$lists.length) return;

            var self = this;
            this.$lists.each(function () {
                self.listInit($(this));
            });
        },
        listInit: function ($list) {
            var self = this,
                $items = $('[data-list_item]', $list),
                $triggers = $('[data-list_trigger]', $list);

            $list.on('click', '[data-list_trigger]', function () {
                var $this = $(this),
                    trigger = $this.attr('data-list_trigger');
                if (trigger && trigger.length) {
                    var $parent = $this.parents('[data-list]:first'),
                        elParent = $parent.get(0);
                    $triggers = $parent.find('[data-list_trigger]').filter(function (i, el) {
                        return $(el).parents('[data-list]:first').get(0) === elParent;
                    });
                    $triggers.removeAttr('data-expand');
                    $this.attr('data-expand', '');
                    $items = $parent.find('> [data-list_item]');
                    self.expandItem($items.filter('[data-list_item="' + trigger + '"]'), $items, true);
                } else self.toggleItem($(this).parents('[data-list_item]'), $items);
            });
        },
        toggleItem: function ($item, $items) {
            if (!$item.length) return;
            ($item.attr('data-expand') === undefined)
                ? this.expandItem($item, $items) : this.collapseItem($item);
        },
        expandItem: function ($item, $items, directDescendant) {
            if (!$item.length) return;
            if ($item.attr('data-expand') !== undefined) return;
            if ($items) this.collapseItem($items.filter('[data-expand]'), directDescendant);
            $item.attr('data-expand', '');
            $((directDescendant ? '> ' : '') + '[data-list_body]', $item).hide().stop().slideDown('fast');
        },
        collapseItem: function ($items, directDescendant) {
            if (!$items.length) return;
            if ($items.attr('data-expand') === undefined) return;
            $items.removeAttr('data-expand');
            $((directDescendant ? '> ' : '') + '[data-list_body]', $items).show().stop().slideUp('fast');
        }
    },

    state_toggle: {
        init: function () {
            $body.on('click', '[data-setstate]', function (e) {
                e.preventDefault();
                var $this = $(this);
                $this.parents('[data-state]').attr('data-state', $this.attr('data-setstate'));
                pekarstas.runOwnFunction($this.data("run_after"));
            });
        }
    },

    delegate: {
        init: function () {
            this.addEvents();
        },
        addEvents: function () {
            var self = this;
            $body.on('click', function (e) {
                var $el = $(e.target).closest('[data-delegate_click]');
                if ($el.length) self.emitClick($el);
            });
        },
        emitClick: function ($el) {
            var target = $el.attr('data-delegate_click');
            if (!target) return;
            $(target).each(function (i, elTarget) {
                elTarget.click();
            });
        }
    },

    hm2_order: {
        init: function () {
            this.$order_hm2 = $('.order-hm2');
            if (!this.$order_hm2.length) return;

            this.$item = $('.order-hm2__item', this.$order_hm2);
            this.$input_pay = $('input[name="hm2_pay"]', this.$order_hm2);
            this.$input_type = $('input[name="hm2_type"]', this.$order_hm2);
            this.$input_pay_system = $('input[name="hm2_pay_system"]', this.$order_hm2);
            this.$requisites = $('.order-hm2-requisites__text', this.$order_hm2);
            this.$rooms = $('.order-hm2-rooms', this.$order_hm2);

            this.addEvents();
            this.showItem();
            this.changeRooms();
            this.changeRequisites();
        },
        addEvents: function () {
            var self = this;

            this.$input_pay.on('change', function () {
                self.showItem();
            });

            this.$input_type.on('change', function () {
                self.changeRooms();
            });

            this.$input_pay_system.on('change', function () {
                self.changeRequisites();
            });
        },
        showItem: function () {
            this.$item.removeAttr('data-show').filter('[data-pay_' + this.$input_pay.filter(':checked').val() + ']').attr('data-show', '');
        },
        changeRequisites: function () {
            this.$requisites.html(this.$input_pay_system.filter(':checked').attr('data-requisites'));
        },
        changeRooms: function () {
            this.$rooms.removeAttr('data-show').filter('[data-name="' + this.$input_type.filter(':checked').val() + '"]').attr('data-show', '').find('input[name="hm2_room"]:first').click();
        }
    },

    masonry: {
        init: function () {
            this.addMasonry();
            this.addEvents();
        },
        addEvents: function () {
            var self = this;
            $window.on('resize', function () {
                if ($window.width() > 640) self.addMasonry();
                else self.destroy();
            });
        },
        addMasonry: function () {
            if ($window.width() < 641) return;
            $('[data-masonry_options]').each(function (i, el) {
                if (el.Masonry) {
                    el.Masonry.layout();
                    return;
                }
                if (!el.clientWidth) return;
                el.Masonry = new Masonry(el, JSON.parse(el.getAttribute('data-masonry_options')));
            });
        },
        update: function () {
            this.addMasonry();
            window.dispatchEvent(new Event('resize'));
        },
        destroy: function () {
            $('[data-masonry_options]').each(function (i, el) {
                if (!el.Masonry) return;
                el.Masonry.destroy();
                el.Masonry = null;
            });
        }
    },

    owl_slider: {
        init: function () {
            var self = this;

            this.$reviews_student_content_slider = $(".reviews-student-content_carousel");
            this.$reviews_student_user_slider = $(".reviews-student-user_carousel");
            this.$free_learning_get_slider = $(".free-learning-get_icons");
            this.$landing_pro_rooms_list = $(".landing-pro-rooms__list");
            this.$learning_result_get_slider = $(".learning-result-get_icons");
            this.$hud_popup_slider = $(".hud-popup-items");
            this.$reviews_user_slider = $(".reviews-user-wrap");
            this.$vip_features_slider = $(".vip-features-icons");
            this.$screenshots_slider = $(".screenshots-slider");
            this.$education_reviews2_carousel = $(".education-reviews2__carousel");
            this.$education_reviews2_photo_carousel = $(".education-reviews2__carousel-photo");
            this.$education_video_carousel = $(".education-video__carousel");
            this.$education_video_preview_carousel = $(".education-video__carousel-preview");
            this.$authors_carousel = $(".authors-carousel__body");
            this.$rakeback_admin_messages_carousel = $(".rakeback-admin-messages__carousel");
            this.$shop_news_carousel = $(".shop-news__carousel");
            this.$comments_carousel = $(".comments__carousel");
            this.$comments_avatar_carousel = $(".comments-avatar-carousel");
            this.$trainers_list = $(".trainers-list--owl-mobile");
            this.$trainers_list2_avatar = $(".trainers-list2-avatar");
            this.$courses_list = $(".courses-list.courses-list--owl-mobile");
            this.$china_rooms_carousel = $(".china-rooms-carousel__wrap");
            this.$china_rooms_logo_carousel = $(".china-rooms-carousel__logos");
            this.$room_card_carousel = $(".room-card-carousel");
            this.$room_card_list = $(".room-card-list");
            this.$expert_carousel = $(".expert-carousel");
            this.$screenshot_carousel = $(".screenshot-carousel");
            this.$mobile_apps_carousel = $(".mobile-apps_content-cards");
            this.$mobile_apps_carousel_card = $(".mobile-apps_content-card");
            this.owl_param = {
                nav: false,
                dots: true,
                items: 1,
                autoHeight: true
            };

            if (this.$reviews_student_content_slider.length) {
                var reviews_student_content_slider = this.$reviews_student_content_slider.owlCarousel({
                    nav: true,
                    items: 1,
                    autoHeight: true
                });

                var reviews_student_user_slider = this.$reviews_student_user_slider.owlCarousel({
                    nav: false,
                    center: true,
                    responsive: {
                        1: {
                            items: 3,
                            slideBy: 1
                        },
                        640: {
                            items: 3,
                            slideBy: 1
                        },
                        641: {
                            items: 5,
                            slideBy: 1
                        }
                    }
                });

                reviews_student_content_slider.on('changed.owl.carousel', function (e) {
                    $(".reviews-student-user_item", self.$reviews_student_user_slider).removeClass("_active").filter(":eq(" + e.item.index + ")").addClass("_active");
                    reviews_student_user_slider.trigger('to.owl.carousel', [e.item.index]);
                });

                $(".reviews-student-user_item", this.$reviews_student_user_slider).on("click", function () {
                    reviews_student_content_slider.trigger('to.owl.carousel', [$(this).parents(".owl-item").index()]);
                });

                $(".reviews-student-user_item._active", this.$reviews_student_user_slider).click();
            }

            if (this.$free_learning_get_slider.length) {
                if ($window.width() < 641) {
                    this.$free_learning_get_slider.owlCarousel(this.owl_param);
                }

                $window.on("resize", function () {
                    if ($window.width() < 641) {
                        setTimeout(function () {
                            self.$free_learning_get_slider.owlCarousel(self.owl_param);
                        }, 100);
                    } else {
                        if (self.$free_learning_get_slider.hasClass("owl-carousel")) {
                            self.$free_learning_get_slider.trigger('destroy.owl.carousel').removeClass("owl-carousel owl-loaded").find(".free-learning-get_icons_wrap").unwrap(".owl-stage-outer");
                        }
                    }
                });
            }

            if (this.$landing_pro_rooms_list.length) {
                if ($window.width() < 641) {
                    this.$landing_pro_rooms_list.owlCarousel({
                        nav: false,
                        dots: true,
                        items: 1,
                        autoHeight: true,
                        margin: -24
                    });
                }

                $window.on("resize", function () {
                    if ($window.width() < 641) {
                        setTimeout(function () {
                            self.$landing_pro_rooms_list.owlCarousel({
                                nav: false,
                                dots: true,
                                items: 1,
                                autoHeight: true,
                                margin: -24
                            });
                        }, 100);
                    } else {
                        if (self.$landing_pro_rooms_list.hasClass("owl-carousel")) {
                            self.$landing_pro_rooms_list.trigger('destroy.owl.carousel').removeClass("owl-carousel owl-loaded").find(".landing-pro-rooms__col").unwrap(".owl-stage-outer");
                            var $landing_pro_rooms_list = $('.landing-pro-rooms__list');
                            pekarstas.landing_pro.setMinHeight($landing_pro_rooms_list, '.landing-pro-rooms-item__list');
                            pekarstas.landing_pro.setMinHeight($landing_pro_rooms_list, '.landing-pro-rooms-item');
                        }
                    }
                });
            }

            if (self.$trainers_list.length) {
                self.$trainers_list.owlCarousel({
                    nav: true,
                    dots: true,
                    items: 1,
                    autoHeight: true,
                });
            }

            if (self.$courses_list.length) {
                self.$courses_list.owlCarousel({
                    nav: true,
                    dots: true,
                    items: 1,
                    autoHeight: true,
                });
            }

            if (this.$learning_result_get_slider.length) {
                if ($window.width() < 641) {
                    this.$learning_result_get_slider.owlCarousel(this.owl_param);
                }

                $window.on("resize", function () {
                    if ($window.width() < 641) {
                        setTimeout(function () {
                            self.$learning_result_get_slider.owlCarousel(self.owl_param);
                        }, 100);
                    } else {
                        if (self.$learning_result_get_slider.hasClass("owl-carousel")) {
                            self.$learning_result_get_slider.trigger('destroy.owl.carousel').removeClass("owl-carousel owl-loaded").find(".learning-result-get_icons_wrap").unwrap(".owl-stage-outer");
                        }
                    }
                });
            }

            if (this.$hud_popup_slider.length) {
                if ($window.width() < 641) {
                    this.$hud_popup_slider.owlCarousel(this.owl_param);
                }

                $window.on("resize", function () {
                    if ($window.width() < 641) {
                        setTimeout(function () {
                            self.$hud_popup_slider.owlCarousel(self.owl_param);
                        }, 100);
                    } else {
                        if (self.$hud_popup_slider.hasClass("owl-carousel")) {
                            self.$hud_popup_slider.trigger('destroy.owl.carousel').removeClass("owl-carousel owl-loaded").find(".hud-popup-wrap").unwrap(".owl-stage-outer");
                        }
                    }
                });
            }

            if (this.$reviews_user_slider.length) {
                if ($window.width() < 641) {
                    this.$reviews_user_slider.owlCarousel(this.owl_param);
                }

                $window.on("resize", function () {
                    if ($window.width() < 641) {
                        setTimeout(function () {
                            self.$reviews_user_slider.owlCarousel(self.owl_param);
                        }, 100);
                    } else {
                        if (self.$reviews_user_slider.hasClass("owl-carousel")) {
                            self.$reviews_user_slider.trigger('destroy.owl.carousel').removeClass("owl-carousel owl-loaded").find(".reviews-user-item").unwrap(".owl-stage-outer");
                        }
                    }
                });
            }

            if (this.$vip_features_slider.length) {
                if ($window.width() < 641) {
                    this.$vip_features_slider.owlCarousel(this.owl_param);
                }

                $window.on("resize", function () {
                    if ($window.width() < 641) {
                        setTimeout(function () {
                            self.$vip_features_slider.owlCarousel(self.owl_param);
                        }, 100);
                    } else {
                        if (self.$vip_features_slider.hasClass("owl-carousel")) {
                            self.$vip_features_slider.trigger('destroy.owl.carousel').removeClass("owl-carousel owl-loaded").find(".column-layout").unwrap(".owl-stage-outer");
                        }
                    }
                });
            }

            if (this.$screenshots_slider.length) {
                this.$screenshots_slider_arrow = $(".screenshots .screenshots-arrow");

                this.$screenshots_slider.owlCarousel({
                    nav: false,
                    loop: true,
                    items: 1
                });

                this.$screenshots_slider_arrow.on("click", function () {
                    if ($(this).hasClass("_prev")) {
                        $(".owl-prev", self.$screenshots_slider).click();
                    } else {
                        $(".owl-next", self.$screenshots_slider).click();
                    }
                });
            }

            if (this.$education_reviews2_carousel.length) {
                var education_reviews2_carousel = this.$education_reviews2_carousel.owlCarousel({
                    nav: true,
                    items: 1,
                    autoHeight: true
                });

                var education_reviews2_photo_carousel = this.$education_reviews2_photo_carousel.owlCarousel({
                    nav: false,
                    dotsEach: 1,
                    items: 5
                });

                education_reviews2_carousel.on('changed.owl.carousel', function (e) {
                    $(".education-reviews2-item__photo", self.$education_reviews2_photo_carousel).removeAttr("data-active").filter(":eq(" + e.item.index + ")").attr("data-active", "").click();
                });

                $(".education-reviews2-item__photo", this.$education_reviews2_photo_carousel).on("click", function () {
                    var $this = $(this),
                        $parent = $this.parents('.education-reviews2__carousel'),
                        index = $this.parents(".owl-item").index(),
                        to_index = index - 1;
                    if (to_index < 0) to_index = 0;
                    $(".education-reviews2-item__photo", $parent).removeAttr('data-active');
                    $this.attr('data-active', '');
                    education_reviews2_photo_carousel.trigger('to.owl.carousel', [to_index]);
                    education_reviews2_carousel.trigger('to.owl.carousel', [index]);
                });
            }

            if (this.$education_video_carousel.length) {
                var education_video_carousel = this.$education_video_carousel.owlCarousel({
                    nav: true,
                    items: 1
                });

                var education_video_preview_carousel = this.$education_video_preview_carousel.owlCarousel({
                    nav: false,
                    dotsEach: 1,
                    responsive: {
                        1: {
                            items: 1,
                            autoWidth: true
                        },
                        640: {
                            items: 1,
                            autoWidth: true
                        },
                        641: {
                            items: 3
                        }
                    }
                });

                education_video_carousel.on('changed.owl.carousel', function (e) {
                    $(".education-video-preview, .video-list-item", self.$education_video_preview_carousel).removeAttr("data-active").filter(":eq(" + e.item.index + ")").attr("data-active", "").click();
                });

                $(".education-video-preview, .video-list-item", this.$education_video_preview_carousel).on("click", function () {
                    var $this = $(this),
                        $parent = $this.parents('.education-video__carousel-preview'),
                        index = $this.parents(".owl-item").index(),
                        to_index = index - 1;
                    if (to_index < 0) to_index = 0;
                    $(".education-video-preview, .video-list-item", $parent).removeAttr('data-active');
                    $this.attr('data-active', '');
                    education_video_preview_carousel.trigger('to.owl.carousel', [to_index]);
                    education_video_carousel.trigger('to.owl.carousel', [index]);
                });
            }

            if (this.$authors_carousel.length) {
                this.$authors_carousel.owlCarousel({
                    nav: true,
                    items: 1,
                    loop: true,
                    autoHeight: true
                });
            }

            if (this.$rakeback_admin_messages_carousel.length) {
                this.$rakeback_admin_messages_carousel.owlCarousel({
                    nav: true,
                    items: 1,
                    loop: false,
                    autoHeight: true
                });
            }

            if (this.$shop_news_carousel.length) {
                this.$shop_news_carousel.owlCarousel({
                    nav: true,
                    items: 1,
                    loop: false,
                    autoHeight: true
                });
            }

            if (this.$room_card_carousel.length) {
                this.$room_card_carousel.owlCarousel({
                    nav: true,
                    responsive: {
                        1: {
                            items: 1,
                            margin: 14
                        },
                        640: {
                            items: 1,
                            margin: 14
                        },
                        641: {
                            items: 3,
                            margin: 20
                        }
                    }
                });
            }

            if (this.$room_card_list.length) {
                if ($window.width() < 641) {
                    this.$room_card_list.owlCarousel({
                        nav: true,
                        items: 1,
                        margin: 14
                    });
                }

                $window.on("resize", function () {
                    if ($window.width() < 641) {
                        setTimeout(function () {
                            self.$room_card_list.owlCarousel({
                                nav: true,
                                items: 1,
                                margin: 14
                            });
                        }, 100);
                    } else {
                        if (self.$room_card_list.hasClass("owl-carousel")) {
                            self.$room_card_list.trigger('destroy.owl.carousel').removeClass("owl-carousel owl-loaded").find(".room-card").unwrap(".owl-stage-outer");
                        }
                    }
                });
            }

            if (this.$comments_carousel.length) {
                var comments_carousel = this.$comments_carousel.owlCarousel({
                    nav: false,
                    items: 1,
                    autoHeight: true
                });

                var comments_avatar_carousel = this.$comments_avatar_carousel.owlCarousel({
                    nav: true,
                    items: 3,
                    slideBy: 1
                });

                comments_carousel.on('changed.owl.carousel', function (e) {
                    $(".comments-avatar-carousel__item", self.$comments_avatar_carousel).removeAttr("data-active").filter(":eq(" + e.item.index + ")").attr("data-active", '').click();
                });

                $(".owl-next", this.$comments_avatar_carousel).on("click", function () {
                    var $next = $(".comments-avatar-carousel__item[data-active]", self.$comments_avatar_carousel).parents(".owl-item").next();

                    if ($next.length) {
                        $next.find('.comments-avatar-carousel__item').click();
                    } else {
                        $(".owl-item:first .comments-avatar-carousel__item", self.$comments_avatar_carousel).click();
                    }
                });

                $(".owl-prev", this.$comments_avatar_carousel).on("click", function () {
                    var $prev = $(".comments-avatar-carousel__item[data-active]", self.$comments_avatar_carousel).parents(".owl-item").prev();

                    if ($prev.length) {
                        $prev.find('.comments-avatar-carousel__item').click();
                    } else {
                        $(".owl-item:last .comments-avatar-carousel__item", self.$comments_avatar_carousel).click();
                    }
                });

                $(".comments-avatar-carousel__item", this.$comments_avatar_carousel).on("click", function () {
                    var $this = $(this),
                        $parent = $this.parents('.comments-avatar-carousel'),
                        index = $this.parents(".owl-item").index();
                    $(".comments-avatar-carousel__item", $parent).removeAttr('data-active');
                    $this.attr('data-active', '');
                    comments_avatar_carousel.trigger('to.owl.carousel', [Math.floor(index / 3)]);
                    comments_carousel.trigger('to.owl.carousel', [index]);
                });

                $(".comments-avatar-carousel__item[data-active]", this.$comments_avatar_carousel).click();
            }

            if (this.$china_rooms_carousel.length) {
                var china_rooms_carousel = this.$china_rooms_carousel.owlCarousel({
                    nav: false,
                    responsive: {
                        1: {
                            items: 1,
                            autoHeight: true
                        },
                        640: {
                            items: 1,
                            autoHeight: true
                        },
                        641: {
                            items: 2,
                            margin: 30,
                            autoWidth: true
                        }
                    }
                });

                var china_rooms_logo_carousel = this.$china_rooms_logo_carousel.owlCarousel({
                    nav: true,
                    items: 4,
                    slideBy: 1
                });

                china_rooms_carousel.on('changed.owl.carousel', function (e) {
                    $(".china-rooms-carousel__logo", self.$china_rooms_logo_carousel).removeAttr("data-active").filter(":eq(" + e.item.index + ")").attr("data-active", '').click();
                });

                $(".owl-next", this.$china_rooms_logo_carousel).on("click", function () {
                    var $next = $(".china-rooms-carousel__logo[data-active]", self.$china_rooms_logo_carousel).parents(".owl-item").next();

                    if ($next.length) {
                        $next.find('.china-rooms-carousel__logo').click();
                    } else {
                        $(".owl-item:first .china-rooms-carousel__logo", self.$china_rooms_logo_carousel).click();
                    }
                });

                $(".owl-prev", this.$china_rooms_logo_carousel).on("click", function () {
                    var $prev = $(".china-rooms-carousel__logo[data-active]", self.$china_rooms_logo_carousel).parents(".owl-item").prev();

                    if ($prev.length) {
                        $prev.find('.china-rooms-carousel__logo').click();
                    } else {
                        $(".owl-item:last .china-rooms-carousel__logo", self.$china_rooms_logo_carousel).click();
                    }
                });

                $(".china-rooms-carousel__logo", this.$china_rooms_logo_carousel).on("click", function () {
                    var $this = $(this),
                        $parent = $this.parents('.china-rooms-carousel__logos'),
                        index = $this.parents(".owl-item").index();
                    $(".china-rooms-carousel__logo", $parent).removeAttr('data-active');
                    $this.attr('data-active', '');
                    china_rooms_logo_carousel.trigger('to.owl.carousel', [Math.floor(index / 4)]);
                    china_rooms_carousel.trigger('to.owl.carousel', [index]);
                });
            }

            if (this.$expert_carousel.length) {
                if ($('.expert-carousel__item', this.$expert_carousel).length > 1) {
                    this.$expert_carousel.owlCarousel({
                        nav: true,
                        items: 1,
                        loop: true,
                        autoHeight: true
                    });
                }
            }

            if (this.$screenshot_carousel.length) {
                if ($('.screenshot-carousel__item', this.$screenshot_carousel).length > 1) {
                    this.$screenshot_carousel.owlCarousel({
                        nav: true,
                        items: 1,
                        loop: true,
                        autoHeight: true,
                        margin: 14,
                    });
                }
            }

            if (this.$mobile_apps_carousel_card.length > 3) {
                this.$mobile_apps_carousel.owlCarousel({
                    nav: true,
                    items: 1,
                    margin: 10,
                    dots: true,
                    dotsEach: 1,
                    loop: true,
                    onInitialized: 4,
                    touchDrag: true,
                    autoHeight: true,
                    responsive: {
                        641: {
                            items: 3,
                        }
                    }
                });
            }
        }
    },

    scroll: {
        init: function () {
            this.toggleCustomScroll();
            this.addEvents();
        },
        addEvents: function () {
            var self = this;
            window.addEventListener('resize', function () {
                self.toggleCustomScroll();
            });
        },
        toggleCustomScroll: function () {
            if ($window.width() < 641) {
                document.querySelectorAll('.js-custom-scroll').forEach(function (el) {
                    if (!el.CustomScroll) return;
                    $(el).mCustomScrollbar('destroy');
                    el.CustomScroll = null;
                });
            } else {
                document.querySelectorAll('.js-custom-scroll').forEach(function (el) {
                    if (el.CustomScroll) return;
                    $(el).mCustomScrollbar();
                    el.CustomScroll = true;
                });
            }
        },
        destroy: function (selector) {
            selector = selector || '.js-custom-scroll';
            document.querySelectorAll(selector).forEach(function (el) {
                $(el).mCustomScrollbar('destroy');
                el.CustomScroll = null;
            });
        }
    },

    scroll_top: {
        init: function () {
            var self = this;

            this.scroll_top = $(".scroll-top, .footer-scroll-top");

            $window.on("scroll", function () {
                if ($window.scrollTop() >= 100) {
                    self.scroll_top.addClass("_show");
                } else {
                    self.scroll_top.removeClass("_show");
                }
            });

            this.scroll_top.on("click", function (e) {
                e.preventDefault();
                $("html, body").animate({ scrollTop: 0 });
            });
        }
    },

    scroll_to: {
        init: function () {
            this.$local_link = $('a.local-link');
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            this.$local_link.on('click', function (e) {
                var $target = $('#' + $(this).attr('href').split('#')[1]);

                if (!$target.length) return;
                e.preventDefault();
                self.scrollTo($target);
            });
        },
        scrollTo: function ($target) {
            if (!$target.length) return;
            $('html, body').stop().animate({ scrollTop: $target.offset().top });
        }
    },

    room_fixed: {
        init: function () {
            this.$room_fixed = $(".room-fixed");
            if (!this.$room_fixed.length) return;

            this.$trigger = $(this.$room_fixed.attr('data-trigger'));
            if (!this.$trigger.length) return;

            var self = this;
            this.offset_top = this.$trigger.position().top + this.$trigger.innerHeight();

            $window.on("resize", function () {
                if ($window.width() > 640) {
                    self.offset_top = self.$trigger.position().top + self.$trigger.innerHeight();
                }
            });

            $window.on("scroll", function () {
                if ($window.width() > 640) {
                    if ($window.scrollTop() >= self.offset_top) {
                        self.$room_fixed.show();
                    } else {
                        self.$room_fixed.hide();
                    }
                }
            }).scroll();
        }
    },

    education_faq: {
        init: function () {
            this.$faq = $(".education-faq2");
            if (!this.$faq) return;

            this.$faq_trigger = $('.education-faq-item__trigger', this.$faq);
            this.$faq_question = $('.education-faq-item__question', this.$faq);
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            this.$faq_trigger.on('click', function () {
                self.toggleItem($(this).parents('.education-faq-item'));
            });

            this.$faq_question.on('click', function () {
                self.toggleItem($(this).parents('.education-faq-item'));
            });
        },
        toggleItem: function ($item) {
            ($item.attr('data-expand') === undefined)
                ? this.expandItem($item) : this.collapseItem($item);
        },
        expandItem: function ($item) {
            if ($item.attr('data-expand') !== undefined) return;
            this.collapseItem($('.education-faq-item[data-expand]', $item.parent()));
            $item.attr('data-expand', '');
            $('.education-faq-item__answer', $item).hide().stop().slideDown('fast');
        },
        collapseItem: function ($item) {
            if ($item.attr('data-expand') === undefined) return;
            $item.removeAttr('data-expand');
            $('.education-faq-item__answer', $item).show().stop().slideUp('fast');
        }
    },

    rooms_filter: {
        init: function () {
            this.$rooms_filter = $('.rooms-filter');
            if (!this.$rooms_filter) return;

            this.$rooms_filter_trigger = $('.rooms-filter-item__title', this.$rooms_filter);
            this.rooms_filter_item = '.rooms-filter-item';
            this.rooms_filter_body = '.rooms-filter-item__body';
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            this.$rooms_filter_trigger.on('click', function () {
                self.toggleItem($(this).parents(self.rooms_filter_item));
            });
        },
        toggleItem: function ($item) {
            ($item.attr('data-expand') === undefined)
                ? this.expandItem($item) : this.collapseItem($item);
        },
        expandItem: function ($item) {
            if ($item.attr('data-expand') !== undefined) return;
            this.collapseItem($(this.rooms_filter_item + '[data-expand]', $item.parent()));
            $item.attr('data-expand', '');
            $(this.rooms_filter_body, $item).hide().stop().slideDown('fast');
        },
        collapseItem: function ($item) {
            if ($item.attr('data-expand') === undefined) return;
            $item.removeAttr('data-expand');
            $(this.rooms_filter_body, $item).show().stop().slideUp('fast');
        }
    },

    show_all: {
        init: function () {
            $('[data-show_all]').on('click', function (e) {
                e.preventDefault();

                if (e.currentTarget.getAttribute('data-show_all') === 'current') {
                    e.currentTarget.remove();
                    return;
                }
                var $parent = $(this).parent(),
                    $parent_parent = $parent.parent();

                $parent.remove();
                // pekarstas.post_list.setMinHeight($parent_parent, '.landing-education2-trainers');
                console.log($parent_parent)
                // pekarstas.post_list.setMinHeight($parent_parent, '.post-list-item:not(.post-list-item_small)');
            });
        }
    },

    circle_percent: {
        init: function () {
            this.$circle_percent = $('.circle-percent');
            if (!this.$circle_percent) return;
            this.$room_landing2_cover_rating = $('.room-landing2-cover-rating');
            this.$room_landing2_cover_rating_grade = $('.room-landing2-cover__rating-grade');
            this.mouse_leave_timeout = null;
            this.mouse_leave_timeout_duration = 300;
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            this.$room_landing2_cover_rating.on('mouseenter', function () {
                if ($window.width() < 641) return;
                clearTimeout(self.mouse_leave_timeout);
                self.openPopup();
            }).on('mouseleave', function () {
                if ($window.width() < 641) return;
                self.mouse_leave_timeout = setTimeout(function () {
                    self.closePopup();
                }, self.mouse_leave_timeout_duration);
            });
            this.$room_landing2_cover_rating_grade.on('click', function () {
                if ($window.width() > 0) return;
                self.openPopup();
            }).on('mouseenter', function () {
                if ($window.width() < 641) return;
                clearTimeout(self.mouse_leave_timeout);
                self.openPopup();
            }).on('mouseleave', function () {
                if ($window.width() < 641) return;
                self.mouse_leave_timeout = setTimeout(function () {
                    self.closePopup();
                }, self.mouse_leave_timeout_duration);
            });
        },
        openPopup: function () {
            var self = this;
            this.$room_landing2_cover_rating.attr('data-active', '');
            this.$circle_percent.each(function () {
                self.setPercent($(this));
            });
        },
        closePopup: function () {
            var self = this;
            this.$room_landing2_cover_rating.removeAttr('data-active');
            this.$circle_percent.each(function () {
                self.setPercent($(this), 0.1);
            });
        },
        setPercent: function ($obj, percent) {
            if ($obj.attr('data-percent') === undefined) return;
            var $bar = $('.circle-percent__bar', $obj),
                radius = parseInt($bar.attr('r'), 10),
                color_arr = ['#E64040', '#FFCC66', '#6CAD84'],
                color = 0;

            percent = percent || parseInt($obj.attr('data-percent'), 10) || 0;
            if (percent > 100) percent = 100;
            if (percent < 0) percent = 0;
            if (percent > 30) color = 1;
            if (percent > 60) color = 2;
            $bar.css({
                'transition': (percent > 1) ? 'all 1s .2s' : 'none',
                'strokeDashoffset': ((100 - percent) / 100) * (Math.PI * (radius * 2)) + 'px',
                'stroke': color_arr[color]
            });
        }
    },

    video_pro: {
        init: function () {
            this.$video_playlist_item = $('.video-pro-playlist__item');
            this.$video_player = $('.video-pro-player');
            this.$video_playlist_group_toggle = $('.video-pro-playlist-group__toggle');
            this.prev_player = null;
            this.addEvents();
            if (!this.$video_playlist_item.length) return;
            this.$video_playlist_item.filter('[data-active]').click();
        },
        addEvents: function () {
            var self = this;

            this.$video_playlist_item.on('click', function (e) {
                var $this = $(this),
                    video_id = $this.attr('data-video'),
                    video_player = $this.attr('data-player');

                if ($this.attr('data-active') !== undefined && e.originalEvent !== undefined) return;
                self.$video_playlist_item.removeAttr('data-active');
                $this.attr('data-active', '');
                if ($this.hasClass('video-pro-playlist__item_lock')) return self.showVipAccess();
                if (video_id === undefined) return self.showNotFound();
                if (video_player === undefined) return self.showNotFound();
                self.showVideo(video_id, video_player);
            });

            this.$video_playlist_group_toggle.on('click', function () {
                self.toggleGroup($(this).parents('.video-pro-playlist-group'));
            });
        },
        showVideo: function (video_id, video_player) {
            var $player = $('.' + video_player + '_embed', this.$video_player);

            this.$video_player.removeAttr('data-vip data-not-found');
            if (video_player !== this.prev_player) {
                $('iframe', this.$video_player).removeAttr('data-active').attr('src', '');
                $player.attr('data-active', '');
                this.prev_player = video_player;
            }
            $player.attr('src', $player.attr('data-src') + video_id);
        },
        showVipAccess: function () {
            this.$video_player.removeAttr('data-not-found');
            this.$video_player.attr('data-vip', '');
            $('iframe', this.$video_player).attr('src', '');
        },
        showNotFound: function () {
            this.$video_player.removeAttr('data-vip');
            this.$video_player.attr('data-not-found', '');
            $('iframe', this.$video_player).attr('src', '');
        },
        toggleGroup: function ($item) {
            ($item.attr('data-expand') === undefined)
                ? this.expandGroup($item) : this.collapseGroup($item);
        },
        expandGroup: function ($item) {
            if ($item.attr('data-expand') !== undefined) return;
            $item.attr('data-expand', '');
            $('.video-pro-playlist-group__wrap', $item).hide().stop().slideDown('fast');
        },
        collapseGroup: function ($item) {
            if ($item.attr('data-expand') === undefined) return;
            $item.removeAttr('data-expand');
            $('.video-pro-playlist-group__wrap', $item).show().stop().slideUp('fast');
        }
    },

    question_switch: {
        init: function () {
            this.$question_switch_title = $('.question-switch__title');
            if (!this.$question_switch_title.length) return;
            this.$question_switch_item = $('.question-switch__item');
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            this.$question_switch_title.on('click', function () {
                var $parent = $(this).parents('.question-switch__item');

                if ($parent.attr('data-expand') === undefined) self.expandItem($parent);
            });
        },
        expandItem: function ($item) {
            var self = this;

            if ($item.attr('data-expand') !== undefined) return;
            this.$question_switch_item.each(function () {
                self.collapseItem($(this));
            });
            $item.attr('data-expand', '');
            $('.question-switch__body', $item).hide().stop().slideDown('fast');
        },
        collapseItem: function ($item) {
            if ($item.attr('data-expand') === undefined) return;
            $item.removeAttr('data-expand');
            $('.question-switch__body', $item).show().stop().slideUp('fast');
        }
    },

    data_filter: {
        init: function () {
            this.$data_filter = $('.data-filter');
            if (!this.$data_filter.length) return;
            this.$data_filter_more = $('.data-filter__more');
            this.$data_filter_row_hide = $('.data-filter__row_hide');
            this.$data_filter_trigger = $('.data-filter__trigger');
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            this.$data_filter_more.on('click', function () {
                self.toggleFilterRow();
            });

            this.$data_filter_trigger.on('click', function () {
                (self.$data_filter.attr('data-expand') === undefined)
                    ? self.$data_filter.attr('data-expand', '') : self.$data_filter.removeAttr('data-expand');
            });
        },
        toggleFilterRow: function () {
            (this.$data_filter_more.attr('data-active') === undefined)
                ? this.showFilterRow() : this.hideFilterRow();
        },
        showFilterRow: function () {
            this.$data_filter_more.attr('data-active', '');
            this.$data_filter_row_hide.removeClass('_hide');
        },
        hideFilterRow: function () {
            this.$data_filter_more.removeAttr('data-active');
            this.$data_filter_row_hide.addClass('_hide');
        }
    },

    favorite: {
        init: function () {
            this.$last_fav = null;
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            $body.on('click', '.unit-fav', function () {
                var $this = $(this);

                if ($this.attr('data-active') === undefined) {
                    $this.attr('data-active', '');
                } else {
                    self.$last_fav = $this;
                    pekarstas.popup.openPopup('fav_remove');
                }
            });

            $('.popup-fav-remove .button._red').on('click', function () {
                if (self.$last_fav) {
                    self.$last_fav.removeAttr('data-active');
                    self.$last_fav = null;
                }
            });
        }
    },

    comments: {
        init: function () {
            this.$comments_item_button_expand = $('.comments-item__button-expand');
            this.$comments_item_menu = $('.comments-item-menu');
            this.$comments_item_claim = $('.comments-item__claim');
            this.$comments_item_link = $('.comments-item__link');
            this.$comments_form = $('.comments-form');
            this.$comments_stars = $('.comments-stars');
            this.$comments_stars_input = $('.comments-stars__input');
            this.$comments_stars_star = $('.comments-stars__star');
            this.notice_timeout_duration = 5000;
            this.notice_text = {
                claim: 'Ваша жалоба получена и наша администрация рассмотрит ее в ближайщее время.',
                link: '<svg xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#icon-link"></use></svg>Ссылка была успешно скопирована в буфер обмена'
            };
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            this.$comments_item_button_expand.on("click", function (e) {
                e.preventDefault();
                var $this = $(this),
                    $parent = $this.parents('.comments-item'),
                    $owl_height = $this.parents('.owl-height');

                $parent.removeClass('comments-item_short');
                if ($owl_height.length) $owl_height.animate({ 'height': $('.owl-item.active', $owl_height).height() }, 'fast');
            });

            this.$comments_item_claim.on("click", function (e) {
                e.preventDefault();
                self.showNotice($(this).parents('.comments-item__body'), self.notice_text.claim);
            });

            this.$comments_item_link.on("click", function (e) {
                e.preventDefault();
                self.showNotice($(this).parents('.comments-item__body'), self.notice_text.link);
            });

            this.$comments_item_menu.on("click", function () {
                self.toggleMenu($(this));
            });

            this.$comments_form.on("submit", function (e) {
                if (self.$comments_stars_input.length && !self.$comments_stars_input.val().length) {
                    e.preventDefault();
                    self.$comments_stars.attr('data-show_tip', '');
                }
            });

            this.$comments_stars.on("mouseenter", function () {
                self.$comments_stars.removeAttr('data-show_tip');
            });

            this.$comments_stars_star.on("click", function () {
                var index = $(this).attr('data-index');
                self.$comments_stars_input.val(index);
                self.$comments_stars_input.attr('value', index);
            });

            $body.on('click', '.comments-item__notice', function () {
                $(this).fadeOut('fast', function () {
                    $(this).remove();
                });
            });

            $body.on("click", function (e) {
                if (!$(e.target).closest(self.$comments_item_menu).length) {
                    self.hideMenu();
                }
            });
        },
        toggleMenu: function ($menu) {
            ($menu.attr('data-expand') === undefined)
                ? this.expandMenu($menu) : this.hideMenu();
        },
        expandMenu: function ($menu) {
            this.hideMenu();
            if ($menu.attr('data-expand') !== undefined) return;
            $menu.attr('data-expand', '');
        },
        hideMenu: function () {
            this.$comments_item_menu.removeAttr('data-expand');
        },
        showNotice: function ($parent, notice_text) {
            $('.comments-item__notice', $parent).remove();
            $parent.prepend('<div class="comments-item__notice">' + notice_text + '</div>');
            var $notice = $('.comments-item__notice', $parent);
            setTimeout(function () {
                $notice.fadeOut('fast', function () {
                    $notice.remove();
                });
            }, this.notice_timeout_duration);
        }
    },

    room_content: {
        init: function () {
            this.$room_content = $('.room-content');
            if (!this.$room_content.length) return;
            this.$room_content_tab_item = $('.room-content-tab__item');
            this.tab_triggers = [];
            this.getTabTriggers();
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            $window.on('hashchange', function () {
                self.setActiveTab();
            });

            $window.on('load', function () {
                self.setActiveTab();
            });

            $('a.link-anchor').on('click', function () {
                self.setActiveTab();
            });

            this.$room_content_tab_item.on('click', function (e) {
                if (e.originalEvent && $(this).data('tab_trigger')) window.location.href = $(this).attr('data-tab_trigger');
            });
        },
        getTabTriggers: function () {
            var self = this;

            this.$room_content_tab_item.each(function () {
                self.tab_triggers.push($(this).attr('data-tab_trigger'));
            });
        },
        setActiveTab: function () {
            if (window.location.hash === '') return;
            var $target = $(window.location.hash, this.$room_content),
                tab_index = null;
            if (!$target.length) {
                for (var i = 0; i < this.tab_triggers.length; i++) {
                    if (window.location.href.indexOf(this.tab_triggers[i]) !== -1) {
                        tab_index = i;
                        break;
                    }
                }
                if (tab_index === null) return;
            } else tab_index = $target.parents('[data-tab_content]').index();
            var $tab = this.$room_content_tab_item.filter(':eq(' + tab_index + ')');
            $tab.click();
            $('html, body').stop().animate({ scrollTop: ($target.length) ? $target.offset().top : $tab.offset().top });
        }
    },

    post_list: {
        init: function () {
            this.$post_list = $('.post-list');
            if (!this.$post_list.length) return;
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            $window.on('load', function () {
                self.setMinHeight(self.$post_list, '.post-list-item_small');
                self.setMinHeight(self.$post_list, '.post-list-item:not(.post-list-item_small)');
            });
        },
        setMinHeight: function ($list, el) {
            $list.each(function () {
                var $items = $(el, this),
                    items_per_row = $(this).width() / 300,
                    items = [],
                    counter = -1,
                    max_height = 0,
                    $collection = $();

                if (!$items.length) return;
                $items.each(function (i) {
                    var $this = $(this);

                    if (!$this.height()) return;
                    if ((i % items_per_row) === 0) {
                        counter++;
                        items[counter] = [];
                        $collection = $();
                        max_height = 0;
                    }
                    $collection = $collection.add($this);
                    max_height = Math.max(max_height, $('.post-list-item__wrap', $this).height());
                    items[counter] = {
                        items: $collection,
                        max_height: max_height
                    };
                });
                items.forEach(function (item) {
                    item.items.each(function () {
                        $('.post-list-item__wrap', this).css('min-height', item.max_height);
                    });
                });
            });
        }
    },

    rooms_list: {
        init: function () {
            this.$rooms_list = $('.rooms-list2');
            if (!this.$rooms_list.length) return;
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            $window.on('load', function () {
                self.setMinHeight(self.$rooms_list, '.rooms-list2-item');
            });
        },
        setMinHeight: function ($list, el) {
            $list.each(function () {
                var $items = $(el, this),
                    items_per_row = $(this).width() / 300,
                    items = [],
                    counter = -1,
                    max_height = 0,
                    $collection = $();

                if (!$items.length) return;
                $items.each(function (i) {
                    var $this = $(this);

                    if (!$this.height()) return;
                    if ((i % items_per_row) === 0) {
                        counter++;
                        items[counter] = [];
                        $collection = $();
                        max_height = 0;
                    }
                    $collection = $collection.add($this);
                    max_height = Math.max(max_height, $('.rooms-list2-item__info', $this).innerHeight());
                    items[counter] = {
                        items: $collection,
                        max_height: max_height
                    };
                });
                items.forEach(function (item) {
                    item.items.each(function () {
                        $('.rooms-list2-item__info', this).css('min-height', item.max_height);
                    });
                });
            });
        }
    },

    landing_pro: {
        init: function () {
            this.$landing_pro_rooms = $('.landing-pro-rooms');
            if (!this.$landing_pro_rooms.length) return;
            this.$landing_pro_rooms_item = $('.landing-pro-rooms-item');
            this.$landing_pro_rooms_list = $('.landing-pro-rooms__list');
            this.$landing_pro_rooms_select = $('.landing-pro-rooms__select');
            this.collectItems();
            this.addEvents();
            this.setMinHeight(this.$landing_pro_rooms_list, '.landing-pro-rooms-item__list');
            this.setMinHeight(this.$landing_pro_rooms_list, '.landing-pro-rooms-item');
        },
        addEvents: function () {
            this.$landing_pro_rooms_select.on('click', '.unit-select_list_item', function () {
                pekarstas.owl_slider.$landing_pro_rooms_list.trigger('to.owl.carousel', [$(this).index()]);
            });
        },
        collectItems: function () {
            var collect = '',
                first_name = '';

            this.$landing_pro_rooms_item.each(function (i) {
                var name = $(this).attr('data-name');

                if (!i) first_name = name;
                collect += '<div class="unit-select_list_item" data-val="' + name + '"><div class="unit-select_text_title">' + name + '</div></div>';
            });
            $('.unit-select_text_title', this.$landing_pro_rooms_select).html(first_name);
            $('.unit-select_list', this.$landing_pro_rooms_select).html(collect);
        },
        setMinHeight: function ($list, el) {
            var $items = $(el, $list),
                items_per_row = 3,
                items = [],
                counter = -1,
                max_height = 0,
                $collection = $();

            if (!$items.length) return;
            $items.each(function (i) {
                var $this = $(this);

                if (!$this.height()) return;
                if ((i % items_per_row) === 0) {
                    counter++;
                    items[counter] = [];
                    $collection = $();
                    max_height = 0;
                }
                $collection = $collection.add($this);
                max_height = Math.max(max_height, $this.innerHeight());
                items[counter] = {
                    items: $collection,
                    max_height: max_height
                };
            });
            items.forEach(function (item) {
                item.items.each(function () {
                    $(this).css('min-height', item.max_height + 2);
                });
            });
        }
    },

    landing_vip_levels: {
        init: function () {
            this.$landing_vip_levels = $('.landing-vip-levels');
            if (!this.$landing_vip_levels.length) return;
            this.$landing_vip_levels_desc = $('.landing-vip-levels-desc');
            this.$landing_vip_levels_list = $('.landing-vip-levels__list');
            this.$landing_vip_levels_wrap = $('.landing-vip-levels__wrap');
            this.$landing_vip_levels_text = $('.landing-vip-levels__text');
            this.$landing_vip_levels_row = $('.landing-vip-levels__row');
            this.$landing_vip_levels_desc_icon_info = $('.landing-vip-levels-desc__icon-info');
            this.$landing_vip_levels_desc_icon_close = $('.landing-vip-levels-desc__icon-close');
            this.$landing_vip_levels_desc_title_link = $('.landing-vip-levels-desc__title-link');
            this.$landing_vip_levels_list_btn_next = $('.landing-vip-levels__list-btn-next');
            this.$landing_vip_levels_bar = $('.landing-vip-levels__bar');
            this.$landing_vip_levels_bar_handle = $('.landing-vip-levels__bar-handle');
            this.$landing_vip_levels_item_icon = $('.landing-vip-levels-item__icon', this.$landing_vip_levels_row);
            this.$landing_vip_levels_item_list = $('.landing-vip-levels-item__list', this.$landing_vip_levels_row);
            this.$landing_vip_levels_item_text = $('.landing-vip-levels-item__text', this.$landing_vip_levels_row);
            this.height_correct = false;
            this.types = ['basic', 'vip', 'pro'];
            this.cur_type_index = 0;
            this.touchstart_pos = null;
            this.touchend_pos = 0;
            this.touchmove_pos = null;
            this.touchstart_bar_pos = null;
            this.touchmove_bar_pos = null;
            this.bar_handle_width = 0;
            this.bar_offset_max = 0;
            this.bar_offset = 0;
            this.bar_points = [];
            this.animated_slide = null;
            this.animation_slide_timeout = null;
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            this.$landing_vip_levels_desc_icon_info.on('click', function (e) {
                e.preventDefault();
                self.expandDesc($(this).parents('.landing-vip-levels-desc'));
            });
            this.$landing_vip_levels_desc_icon_close.on('click', function (e) {
                e.preventDefault();
                self.collapseDesc();
            });
            this.$landing_vip_levels_desc_title_link.on('click', function (e) {
                if ($window.width() > 640) return;
                e.preventDefault();
                self.toggleDesc($(this).parents('.landing-vip-levels-desc'));
            });
            this.$landing_vip_levels_list_btn_next.on('click', function (e) {
                e.preventDefault();
                self.slideAnimation(1);
            });
            this.$landing_vip_levels_list.on('touchstart', function (e) {
                if ($window.width() > 640) return;
                self.touchstart_pos = self.pointerEventToXY(e);
            }).on('touchmove', function (e) {
                if (self.touchstart_pos === null) return;
                var touchend_pos = self.pointerEventToXY(e);
                if (Math.abs(self.touchstart_pos.y - touchend_pos.y) > Math.abs(self.touchstart_pos.x - touchend_pos.x) && self.touchmove_pos === null) {
                    self.touchstart_pos = null;
                    return;
                }
                self.touchmove_pos = -(self.touchstart_pos.x - self.pointerEventToXY(e).x);
                self.$landing_vip_levels_list.css({ 'transition': 'none', 'transform': 'translateX(' + self.touchmove_pos + 'px)' });
            }).on('touchend', function (e) {
                if (self.touchstart_pos === null) return;
                self.touchend_pos = self.pointerEventToXY(e);
                if (Math.abs(self.touchstart_pos.x - self.touchend_pos.x) > 60) {
                    var touchmove_pos = self.touchmove_pos - $window.width() + 15;
                    if (self.touchstart_pos.x > self.touchend_pos.x) {
                        self.cur_type_index++;
                        touchmove_pos = self.touchmove_pos + $window.width() - 15;
                    } else self.cur_type_index--;
                    self.setType(self.cur_type_index);
                    self.$landing_vip_levels_list.css({ 'transition': 'none', 'transform': 'translateX(' + touchmove_pos + 'px)' });
                }
                self.touchstart_pos = null;
                self.touchmove_pos = null;
                setTimeout(function () {
                    self.$landing_vip_levels_list.css({ 'transition': 'transform 0.3s ease-out', 'transform': 'translateX(0)' });
                }, 10);
            });
            this.$landing_vip_levels_bar_handle.on('touchstart', function (e) {
                self.touchstart_bar_pos = self.pointerEventToXY(e);
                self.bar_handle_width = self.$landing_vip_levels_bar_handle.width();
                self.bar_offset = self.$landing_vip_levels_bar_handle.position().left;
                self.bar_offset_max = self.$landing_vip_levels_bar.width() - self.bar_handle_width;
                self.bar_points = [];
                var bar_point = self.bar_offset_max / self.types.length;
                while (bar_point < self.bar_offset_max) {
                    self.bar_points.push(bar_point);
                    bar_point += bar_point;
                }
            }).on('touchmove', function (e) {
                if (self.touchstart_bar_pos === null) return;
                var touchend_pos = self.pointerEventToXY(e),
                    bar_offset = self.bar_offset,
                    type_index = 0;
                if (Math.abs(self.touchstart_bar_pos.y - touchend_pos.y) > Math.abs(self.touchstart_bar_pos.x - touchend_pos.x) && self.touchmove_bar_pos === null) {
                    self.touchstart_bar_pos = null;
                    return;
                }
                e.preventDefault();
                self.touchmove_bar_pos = -(self.touchstart_bar_pos.x - touchend_pos.x);
                bar_offset += self.touchmove_bar_pos;
                if (bar_offset < 0) bar_offset = 0;
                if (bar_offset > self.bar_offset_max) bar_offset = self.bar_offset_max;
                self.$landing_vip_levels_bar_handle.css({ 'transition': 'none', 'transform': 'translateX(' + bar_offset + 'px)' });
                for (var i = 0; i < self.bar_points.length; i++) {
                    if (bar_offset >= self.bar_points[i]) type_index++;
                }
                self.slideAnimation(type_index);
            }).on('touchend', function (e) {
                if (self.touchstart_bar_pos === null) return;
                self.touchend_bar_pos = self.pointerEventToXY(e);
                self.touchstart_bar_pos = null;
                self.touchmove_bar_pos = null;
                self.$landing_vip_levels_bar_handle.removeAttr('style');
            });
            $window.on('load', function () {
                self.correctHeight();
            });
            $window.on("resize", function () {
                if (this.height_correct) return;
                if ($window.width() < 641) return;
                self.correctHeight();
            });
        },
        toggleDesc: function ($obj) {
            ($obj.attr('data-expand') === undefined)
                ? this.expandDesc($obj) : this.collapseDesc();
        },
        expandDesc: function ($obj) {
            this.collapseDesc();
            $obj.attr('data-expand', '');
            $('.landing-vip-levels-desc__body', $obj).hide().slideDown('fast');
            this.$landing_vip_levels_row.attr('data-expand', '');
            $('.landing-vip-levels-item__icon:eq(' + ($obj.index() - 3) + ')', this.$landing_vip_levels_item_list).attr('data-select', '');
        },
        collapseDesc: function () {
            this.$landing_vip_levels_desc.filter('[data-expand]').each(function () {
                $(this).removeAttr('data-expand');
                $('.landing-vip-levels-desc__body', this).show().slideUp('fast');
            });
            this.$landing_vip_levels_row.removeAttr('data-expand');
            this.$landing_vip_levels_item_icon.removeAttr('data-select');
        },
        setMinHeight: function () {
            if ($window.width() < 641) return;
            var max_height = 0;

            this.$landing_vip_levels_item_text.css('min-height', 0);
            this.$landing_vip_levels_item_text.each(function () {
                max_height = Math.max(max_height, $(this).innerHeight());
            });
            this.$landing_vip_levels_item_text.css('min-height', max_height);
        },
        correctHeight: function () {
            if (this.height_correct) return;
            if ($window.width() < 641) return;
            this.height_correct = true;
            this.setMinHeight();
            var wrap_offset = this.$landing_vip_levels_wrap.offset().top,
                offset_diff = (this.$landing_vip_levels_list.offset().top - wrap_offset) - (this.$landing_vip_levels_item_list.offset().top - wrap_offset);

            if (offset_diff === 0) return;
            if (offset_diff < 0) this.$landing_vip_levels_text.css('padding-bottom', Math.abs(offset_diff));
            if (offset_diff > 0) this.$landing_vip_levels_item_text.css('margin-bottom', Math.abs(offset_diff));
        },
        setType: function (index) {
            if (index < 0) index = this.types.length - 1;
            if (index > (this.types.length - 1)) index = 0;
            this.cur_type_index = index;
            this.$landing_vip_levels_list.attr('data-type', this.types[index]);
        },
        slideAnimation: function (index) {
            if (this.animated_slide === index) return;
            this.animated_slide = index;
            if (index < 0) index = this.types.length - 1;
            if (index > (this.types.length - 1)) index = 0;
            if (index === this.cur_type_index) {
                this.animated_slide = null;
                return;
            }
            clearTimeout(this.animation_slide_timeout);
            var self = this;
            this.$landing_vip_levels_list.css({ 'transition': 'none', 'transform': 'translateX(0)' });
            if (index > this.cur_type_index) {
                this.animation_slide_timeout = setTimeout(function () {
                    self.$landing_vip_levels_list.css({ 'transition': 'transform 0.3s ease-in', 'transform': 'translateX(-50%)' });
                }, 10);
                this.animation_slide_timeout = setTimeout(function () {
                    self.$landing_vip_levels_list.css({ 'transition': 'none', 'transform': 'translateX(50%)' });
                    self.setType(index);
                }, 400);
            } else {
                this.animation_slide_timeout = setTimeout(function () {
                    self.$landing_vip_levels_list.css({ 'transition': 'transform 0.3s ease-in', 'transform': 'translateX(50%)' });
                }, 10);
                this.animation_slide_timeout = setTimeout(function () {
                    self.$landing_vip_levels_list.css({ 'transition': 'none', 'transform': 'translateX(-50%)' });
                    self.setType(index);
                }, 400);
            }
            this.animation_slide_timeout = setTimeout(function () {
                self.$landing_vip_levels_list.css({ 'transition': 'transform 0.3s ease-out', 'transform': 'translateX(0)' });
                self.animated_slide = null;
            }, 410);
        },
        pointerEventToXY: function (e) {
            var out = { x: 0, y: 0 },
                type_list = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];

            if (type_list.indexOf(e.type) !== -1) {
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                out.x = touch.clientX;
                out.y = touch.clientY;
            }
            return out;
        }
    },

    popover: {
        init: function () {
            this.popoverTrigger = '.popover__trigger';
            this.popoverClose = '.popover__close';
            this.addEvents();
        },
        addEvents: function () {
            var self = this;

            $body.on('click', this.popoverTrigger, function (e) {
                e.preventDefault();
                self.toggle($(this).parents('.popover'));
            });

            $body.on('click', this.popoverClose, function (e) {
                e.preventDefault();
                self.close();
            });

            $body.on("click", function (e) {
                if (!$(e.target).closest('.popover').length) {
                    self.close();
                }
            });
        },
        toggle: function ($popover) {
            $popover.attr('data-active') === ''
                ? this.close() : this.open($popover);
        },
        open: function ($popover) {
            this.close();
            $popover.attr('data-active', '');
        },
        close: function () {
            $('.popover').removeAttr('data-active');
        }
    },

    new_ckeditor: {
        init: function () {
            if (typeof CKEDITOR == 'undefined') return;
            var elCkeditorTextarea = document.getElementById('ckeditor_textarea');
            this.ckeditor = CKEDITOR.replace('ckeditor_textarea', { height: elCkeditorTextarea.getAttribute('data-height') || undefined, placeholdertext: elCkeditorTextarea.getAttribute('placeholder') || undefined });
            this.addToolbarButton();
            this.addEvents();
        },
        addToolbarButton: function () {
            this.ckeditor.ui.addButton('SuitKresti', {
                label: "SuitKresti",
                toolbar: 'cards'
            });
            this.ckeditor.ui.addButton('SuitBubi', {
                label: "SuitBubi",
                toolbar: 'cards'
            });
            this.ckeditor.ui.addButton('SuitChervi', {
                label: "SuitChervi",
                toolbar: 'cards'
            });
            this.ckeditor.ui.addButton('SuitPiki', {
                label: "SuitPiki",
                toolbar: 'cards'
            });
            this.ckeditor.ui.addButton('Suit', {
                label: "Suit",
                toolbar: 'cards'
            });
        },
        addEvents: function () {
            var self = this;

            this.ckeditor.on("instanceReady", function () {
                self.addToolbarIcon();
                self.initSuits();
            });

            CKEDITOR.on('dialogDefinition', function (ev) {
                var editor = ev.editor;

                editor.dataProcessor.htmlFilter.addRules({
                    elements: {
                        a: function (element) {
                            if (!element.attributes.rel) element.attributes.rel = 'nofollow';
                            element.attributes.target = '_blank';
                        }
                    }
                });
            });

            $body.on("click", function (e) {
                if (!$(e.target).closest('.cke_button__suits').length) {
                    $('.cke_button__suits').removeAttr('data-active');
                }
            });
        },
        addToolbarIcon: function () {
            this.icons_data = ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote'];
            this.icons_data.forEach(function (item) {
                $('.cke_button__' + item).addClass('icon icon-' + item);
            });
        },
        initSuits: function () {
            var self = this,
                $suits = $('.cke_button__suit').parents('.cke_toolgroup').find('.cke_button').addClass('cke_button__suits').removeAttr('title'),
                suit_list_html = {
                    'suitkresti': [],
                    'suitbubi': [],
                    'suitchervi': [],
                    'suitpiki': [],
                    'suit': []
                },
                suit_list_items = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a', 'x'];

            suit_list_items.forEach(function (item) {
                suit_list_html['suitkresti'] += '<img class="suit-list__item" src="/static/img/cards/' + item + 'c.svg" alt="">';
                suit_list_html['suitbubi'] += '<img class="suit-list__item" src="/static/img/cards/' + item + 'd.svg" alt="">';
                suit_list_html['suitchervi'] += '<img class="suit-list__item" src="/static/img/cards/' + item + 'h.svg" alt="">';
                suit_list_html['suitpiki'] += '<img class="suit-list__item" src="/static/img/cards/' + item + 's.svg" alt="">';
                suit_list_html['suit'] += '<img class="suit-list__item" src="/static/img/cards/' + item + 'o.svg" alt="">';
            });

            $suits.each(function () {
                var $this = $(this),
                    html = '';
                if ($this.hasClass('cke_button__suitkresti')) html = suit_list_html['suitkresti'];
                if ($this.hasClass('cke_button__suitbubi')) html = suit_list_html['suitbubi'];
                if ($this.hasClass('cke_button__suitchervi')) html = suit_list_html['suitchervi'];
                if ($this.hasClass('cke_button__suitpiki')) html = suit_list_html['suitpiki'];
                if ($this.hasClass('cke_button__suit')) html = suit_list_html['suit'];
                $this.append('<div class="suit-list">' + html + '</div>');
            });

            $suits.on('click', function () {
                var $this = $(this);

                if ($this.attr('data-active') === undefined) {
                    $suits.removeAttr('data-active');
                    $this.attr('data-active', '');
                    return;
                }
                $suits.removeAttr('data-active');
            });

            $('.suit-list', $suits).on('click', function (e) {
                e.stopPropagation();
            });

            $('.suit-list__item', $suits).on('click', function () {
                var el = self.ckeditor.document.createElement('img');

                $(el).attr({ "src": $(this).attr('src'), "class": "icon-suit" });
                self.ckeditor.insertElement(el);
            });
        }
    },

    runOwnFunction: function (path) {
        if (!path) return;
        path = path.split('.');
        switch (path.length) {
            case 1:
                pekarstas[path[0]]();
                break;
            case 2:
                pekarstas[path[0]][path[1]]();
                break;
        }
    }
};
pekarstas.init();

$document.ready(function () {

    $(".header-menu-trigger").on('click', function (e) {
        load_page_static()
        $('.popup-menu__subparts[data-tab_content]').removeClass("_active");
    });

    $(".header-search-trigger").on('click', function (e) {
        load_page_static()
        $('.popup-menu__subparts[data-tab_content]').removeClass("_active");
    });


    $(".article-list_more").on("click", function (e) {
        e.preventDefault();
        $(this).hide().prev().slideDown("fast");
    });

    $(".category-list_mobile").on("click", function () {
        $(this).toggleClass("_active");
    });

    $(".category-list_item_title._sub").on("click", function () {
        $(this).toggleClass("_active");
    });

    $(".sort-block-mobile").on('click', function () {
        $(".sort-block-list").toggleClass("_active");
    });

    $(".sort-block-list_item").on('click', function () {
        $(".sort-block-list").removeClass("_active");
    });

    $body.on("click", function (e) {
        if (!$(e.target).closest($(".sort-block")).length) {
            $(".sort-block-list").removeClass("_active");
        }
    });

    $(".landing-faq-item_question").on("click", function () {
        $(this).parents(".landing-faq-item").toggleClass("_active");
    });

    $(".unit-save").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("_active");
    });

    $('.aid-menu-item__link').on('click', function () {
        var $parent = $(this).parents('.aid-menu-item');

        if ($parent.attr('data-expand') === undefined) {
            $parent.attr('data-expand', '');
        } else {
            $parent.removeAttr('data-expand');
        }
    });

    $('.aid2-menu-item__link').on('click', function () {
        var $parent = $(this).parents('.aid2-menu-item');

        if ($parent.attr('data-expand') === undefined) {
            $parent.attr('data-expand', '');
        } else {
            $parent.removeAttr('data-expand');
        }
    });

    $('.aid-menu__show').on('click', function () {
        var $parent = $(this).parents('.aid-menu');

        if ($parent.attr('data-expand') === undefined) {
            $parent.attr('data-expand', '');
        } else {
            $parent.removeAttr('data-expand');
        }
    });

    $('.aid2-menu__show').on('click', function () {
        var $parent = $(this).parents('.aid2-menu');

        if ($parent.attr('data-expand') === undefined) {
            $parent.attr('data-expand', '');
        } else {
            $parent.removeAttr('data-expand');
        }
    });

    $('.profile-new-info__show').on('click', function () {
        var $parent = $(this).parents('.profile-new-info');

        if ($parent.attr('data-expand') === undefined) {
            $parent.attr('data-expand', '');
        } else {
            $parent.removeAttr('data-expand');
        }
    });

    $('.header-search .search-result').mCustomScrollbar();

    $('#tab-btn-trainers').on('click', function () {
        $('#trainers').addClass('active');
        $('#courses').removeClass('active');
        $('#tab-btn-trainers').addClass('active');
        $('#tab-btn-courses').removeClass('active');
        dispatchEvent(new Event('resize'));
    });

    $('#tab-btn-courses').on('click', function () {
        console.log('hello');
        $('#courses').addClass('active');
        $('#trainers').removeClass('active');
        $('#tab-btn-courses').addClass('active');
        $('#tab-btn-trainers').removeClass('active');
        dispatchEvent(new Event('resize'));
    });
    
     $('.unit-spoiler').click(function(){
  $(this).parent().children('div.hide_content').toggle('normal');
  return false;
 });
 
      $('.show_content').click(function(){
  $(this).parent().children('div.hide_content').toggle('normal');
  return false;
 });

    $('body').on("change", $("input[name='radio_mobile-apps-contacts']").filter(':checked'), function () {
        var numActiveCheckbox = $("input[name='radio_mobile-apps-contacts']").filter(':checked').data('number');
        // console.log(numActiveCheckbox);
        if (numActiveCheckbox === 1) {
            $('#mobile-apps_full-form').addClass('active');
            $('#mobile-apps_mini-form').removeClass('active');
        } else if (numActiveCheckbox === 2) {
            $('#mobile-apps_mini-form').addClass('active');
            $('#mobile-apps_full-form').removeClass('active');
        } else {
            return null;
        }
    });
});
