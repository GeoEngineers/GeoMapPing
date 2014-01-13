MainApplication.SlideRegion = Backbone.Marionette.Region.extend({
    el: "#FooterNavSlideOut",
    constructor: function () {
        _.bindAll(this, 'getEl', 'slideOut', 'slideIn');
        Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
        this.on("show", this.slideOut, this);
		this.slideOpen = false;
    },
    getEl: function (selector) {
        var $el = $(selector);
        $el.on("hidden", this.close);
        return $el;
    },
    slideOut: function (view) {
		$('#FooterNavSlideOut').collapse('show');
		this.slideOpen = true;
		//kludgy fix to address display issues sometimes in firefox
		setTimeout(function(){
			if($('#FooterNavSlideOut').hasClass("collapsing")){
				$('#FooterNavSlideOut').css("height","auto");
				$('#FooterNavSlideOut').slideDown();
				$('#FooterNavSlideOut').removeClass("collapsing");	
				$('#FooterNavSlideOut').addClass("in");		
			}
		},500);
    },
    slideIn: function () {
		$('#FooterNavSlideOut').collapse('hide');
		this.slideOpen = false;
		//kludgy fix to address display issues sometimes in firefox
		setTimeout(function(){
			if($('#FooterNavSlideOut').hasClass("in")){
				$('#FooterNavSlideOut').css("height","auto");
				$('#FooterNavSlideOut').slideUp();
				$('#FooterNavSlideOut').removeClass("in");		
				$('#FooterNavSlideOut').addClass("collapsing");		
			}
		},500);		
    }
});

MainApplication.ModalRegion = Backbone.Marionette.Region.extend({
    el: "#localModalBlock",
    constructor: function () {
        _.bindAll(this, 'getEl', 'showModal', 'hideModal', 'lockModal', 'unlockModal');
        Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
        this.on("show", this.showModal, this);
    },
    getEl: function (selector) {
        var $el = $(selector);
        $el.on("hidden", this.close);
        return $el;
    },
    showModal: function (view) {
        view.on("close", this.hideModal, this);
        $("#localModalBlock").css("display","block");
		this.$el.modal('show');
    },
    hideModal: function () {
		//this.unlockModal();
        this.$el.modal('hide');
    },	
    //requires custom lock function in bootstrap
    lockModal: function() {
        //this.$el.modal('lock');
    },
    unlockModal: function() {
        //this.$el.modal('unlock');
    }
});

MainApplication.addRegions({
    titleRegion: "#ApplicationSection",
    mainRegion: "#ApplicationContainer",
	footerRegion: "#FooterNavContainer",
	headerRegion: "#HeaderNavContainer",
	slideRegion: MainApplication.SlideRegion,
    modalRegion: MainApplication.ModalRegion
});