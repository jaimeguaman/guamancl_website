'use strict';

var app=angular.module('guamancl',
	['ngTouch', 'ngRoute' , 'wu.masonry'])
	.config(['$routeProvider', 
		function($routeProvider) {
			$routeProvider.when('/me', {
				templateUrl: 'views/me.html',
				activeTab:'me',
				controller: 'MeController'
			});
			$routeProvider.when('/work', {
				templateUrl: 'views/work.html',
				controller: 'WorkController',
				activeTab:'work'
			});
			$routeProvider.when('/social-networks', {
				templateUrl: 'views/social-network.html',
				activeTab:'social-networks'
			});
			$routeProvider.when('/blog', {
				templateUrl: 'views/blog.html',
				activeTab:'blog'
			});
			$routeProvider.otherwise({redirectTo: '/me'});
	}]);

//random background image
app.directive('jgRandomBackground',function(){
	return {
		restrict:'AC',
		scope:{
			options: '=jgRandomBackground'
		},
		controller: function($scope){
			this.changeBackground = function(){
				if ($scope.getRandomChoice && $scope.setBackgroundCssClass){
					$scope.getRandomChoice();
					$scope.setBackgroundCssClass();
				}				
			}
		},
		link: function($scope, $element){
			$scope.backgroundSelected = 1;

			$scope.getRandomChoice = function(){
				$scope.backgroundSelected = Math.floor(Math.random() * ( ($scope.options.posibilities + 1 ) - 1)) + 1
			}
			$scope.setBackgroundCssClass = function(){
				$element.removeClass();
				$element.addClass($scope.options.cssClassName + $scope.backgroundSelected.toString());
			}

			$scope.getRandomChoice();
			$scope.setBackgroundCssClass();
		}
	}
});

//change background image on click
app.directive('jgChangeBackground',function(){
	return {
		restrict:'AC',
		require: '^jgRandomBackground',
		link: function($scope, $element, $attrs, $controller){
			$element.bind('click',function(){
				$controller.changeBackground();
			})
		}
	}
});

//Navigation Controller
app.controller('NavigationController',['$rootScope','$scope', '$route', function( $rootScope, $scope, $route){
	$scope.$route=$route;
}]);

//Me Controller
app.controller('MeController', [ '$http', '$scope', function( $http, $scope){

	$scope.skills=[];

	$http.jsonp('http://codeivate.com/users/jaimeguaman.json?callback=JSON_CALLBACK').then(function(response){
		if (response.data && response.data.languages){
			var langs = response.data.languages;
			for (var lang in langs){
				if (lang !== 'Plain Text'){
					$scope.skills.push(lang);
				}
			}
		}
	});
}]);

//Work Controller
app.controller('WorkController', [ '$http', '$scope', function( $http, $scope){

	$scope.projects = [
	{
		company : 'Sinbad SpA',
		brand: 'Sinbad Travel',
		url : 'http://cl.sinbad.travel',
		photoSrc: 'http://guaman.cl/images/sinbad.png',
		occupation: 'Full Stack Developer',
		languages: ['HTML', 'CSS', 'Javascript/jQuery', 'PHP', 'MySQL']
	},
	{
		company : 'Portal del flete SpA',
		brand: 'Transportalo',
		url : 'http://transportalo.cl',
		photoSrc: 'http://guaman.cl/images/transportalo.png',
		occupation: 'Full Stack Developer',
		languages: ['HTML', 'CSS', 'Javascript/jQuery', 'PHP/Cake', 'MySQL']
	},
	{
		company : 'Setmatch S.A',
		brand: 'Setmatch',
		url : 'http://guaman.cl/labs/setmatch',
		photoSrc: 'http://guaman.cl/images/setmatch.png',
		occupation: 'Front End Developer',
		languages: ['HTML', 'CSS', 'Javascript/jQuery']
	},
	{
		company : 'Consensus SpA',
		brand: 'eTrader',
		url : '',
		photoSrc: '',
		occupation: 'Front End Developer',
		languages: ['HTML/Jinja2', 'CSS/SASS', 'Javascript/Angular', 'Grunt']
	},
	{
		company : 'Consensus SpA',
		brand: 'Indicadores Económicos',
		url : 'http://bit.ly/1pyXGJd',
		photoSrc: '',
		occupation: 'Front End Developer',
		languages: ['HTML', 'CSS', 'Javascript/jQuery', 'Chrome Extension']
	},
	{
		company : 'Side Project',
		brand: 'Alerta Sismos',
		url : 'http://guaman.cl/app/alerta-sismos',
		photoSrc: '',
		occupation: 'Front End Developer',
		languages: ['HTML', 'CSS', 'Javascript/jQuery', 'Junar API']
	},
	{
		company : 'Side Project',
		brand: 'GIF Soup',
		url : 'http://guaman.cl/labs/GIF',
		photoSrc: '',
		occupation: 'Front End Developer',
		languages: ['HTML', 'CSS', 'Javascript/jQuery', 'Tumblr API']
	},
	{
		company : 'Side Project',
		brand: 'WebGL Globe Earthquakes',
		url : 'http://guaman.cl/labs/webglglobe-earthquake/',
		photoSrc: '',
		occupation: 'Front End Developer',
		languages: ['HTML', 'CSS', 'Javascript/jQuery', 'WebGL', 'USGS API']
	},
	{
		company : 'Side Project',
		brand: 'Best Earth Pix',
		url : 'http://guaman.cl/labs/twitter-ent',
		photoSrc: '',
		occupation: 'Front End Developer',
		languages: ['HTML', 'CSS', 'Javascript/jQuery', 'Twitter API']
	},
	{
		company : 'Side Project',
		brand: 'Love Counter',
		url : 'http://guaman.cl/labs/mes',
		photoSrc: '',
		occupation: 'Front End Developer',
		languages: ['HTML', 'CSS', 'Javascript/jQuery']
	},
	{
		company : 'Side Project',
		brand: 'Impress.js Demo',
		url : 'http://guaman.cl/labs/impressjs',
		photoSrc: '',
		occupation: 'Front End Developer',
		languages: ['HTML', 'CSS', 'Javascript/jQuery', 'Flickr API']
	},
	{
		company : 'Side Project',
		brand: 'Scrolleable Overlay',
		url : 'http://guaman.cl/labs/scrolleable-overlay',
		photoSrc: '',
		occupation: 'Front End Developer',
		languages: ['HTML', 'CSS', 'Javascript/jQuery', 'UX']
	},
	{
		company : 'Side Project',
		brand: 'Youjizz Downloader [NSFW]',
		url : 'http://guaman.cl/app/youjizzdownloader',
		photoSrc: '',
		occupation: 'Front End Developer',
		languages: ['HTML', 'CSS', 'Javascript', 'Chrome Extension']
	},
	];

}]);

