app.directive('wysiwyg',function(){
    return {
        restrict:'E',
        controller : 'wysiwygCtrl',
        link : function(attr, element){
            element.find('iframe').find('head').append('<link rel="stylesheet" href="styles/main.css">');
        }
    }

});

app.directive('contenteditable', ['$sce', function($sce) {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

            // Specify how UI should be updated
            ngModel.$render = function() {
                element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
            };

            // Listen for change events to enable binding
            element.on('blur keyup change', function() {
                scope.$evalAsync(read);
            });
            read(); // initialize

            // Write data to the model
            function read() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if ( attrs.stripBr && html == '<br>' ) {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }
        }
    };
}]);

app.controller('wysiwygCtrl', function($scope, $timeout, $http, $compile, $q, $templateCache){
    $scope.styles = [
        {
            'type':'button',
            'name':'bold',
            'function':'format("bold")'
        },
        {
            'type':'button',
            'name':'carousel',
            'function':'carousel("<div class=switch-container>", "</div>")'
        },
        {
            'type': 'select',
            'name': 'Font'
        },
        {
            'type': 'option',
            'typeName':'font',
            'name': 'Arial',
            'function': 'format("FontName", "arial")'
        },
        {
            'type': 'option',
            'typeName':'font',
            'name': 'Verdana',
            'function': 'format("FontName", "Verdana")'
        },
        {
            'type':'button',
            'name':'AddImage',
            'function':'addImage()'
        },
        {
            'type':'button',
            'name':'browsehappy',
            'function':'addClass("browsehappy")'
        },
        {
            'type':'select',
            'name':'ElementGrill'
        },
        {'type': 'option',
            'typeName':'ElementGrill',
            'function':'ElementSize("large-", "1")',
            'name': '1'
        },
        {'type': 'option',
            'typeName':'ElementGrill',
            'function':'ElementSize("large-", "2")',
            'name': '2'
        },
        {'type': 'option',
            'typeName':'ElementGrill',
            'function':'ElementSize("large-", "3")',
            'name': '3'
        },
        {'type': 'option',
            'typeName':'ElementGrill',
            'function':'ElementSize("large-", "4")',
            'name': '4'
        },
        {'type': 'option',
            'typeName':'ElementGrill',
            'function':'ElementSize("large-", "5")',
            'name': '5'
        },
        {'type': 'option',
            'typeName':'ElementGrill',
            'function':'ElementSize("large-", "6")',
            'name': '6'
        },
        {'type': 'option',
            'typeName':'ElementGrill',
            'function':'ElementSize("large-", "7")',
            'name': '7'
        },
        {'type': 'option',
            'typeName':'ElementGrill',
            'function':'ElementSize("large-", "8")',
            'name': '8'
        },
        {'type': 'option',
            'typeName':'ElementGrill',
            'function':'ElementSize("large-", "9")',
            'name': '9'
        },
        {'type': 'option',
            'typeName':'ElementGrill',
            'function':'ElementSize("large-", "10")',
            'name': '10'
        },
        {'type': 'option',
            'typeName':'ElementGrill',
            'function':'ElementSize("large-", "11")',
            'name': '11'
        },
        {'type': 'option',
            'typeName':'ElementGrill',
            'function':'ElementSize("large-", "12")',
            'name': '12'
        },
        {
            'type' : 'select',
            'name' : 'float'
        },
        {
            'type':'option',
            'typeName': 'float',
            'function' : 'ElementFloat("fleft")',
            'name' : 'Float Left'
        },
        {
            'type':'option',
            'typeName': 'float',
            'function' : 'ElementFloat("fright")',
            'name' : 'Float Right'
        },
        {
            'type':'option',
            'typeName': 'float',
            'function' : 'ElementFloat("fnone")',
            'name' : 'Float None'
        },
        {
            'type': 'select',
            'name': 'Size'
        },
        {'type': 'option',
         'typeName':'Size',
         'value': '1',
         'function':'format("FontSize", 1)',
         'name': '1 (petite)'
        },
        {'type': 'option',
         'typeName':'Size',
        'function':'format("FontSize", "2")',
        'value': '2',
         'name': '2'
        },
        {'type': 'option',
            'typeName':'Size',
            'function':'format("FontSize", "3")',
            'value': '3',
            'name': '3 (normale)'
        },
        {'type': 'option',
            'typeName':'Size',
            'function':'format("FontSize", "4")',
            'value': '4',
            'name': '4'
        },
        {'type': 'option',
            'typeName':'Size',
            'function':'format("FontSize", "5")',
            'value': '5',
            'name': '5'
        },
        {'type': 'option',
            'typeName':'Size',
            'function':'format("FontSize", "6")',
            'value': '6',
            'name': '6'
        },
        {'type': 'option',
            'typeName':'Size',
            'function':'format("FontSize", "7")',
            'value': '7',
            'name': '7 (grande)'
        },
        {
            'type':'button',
            'name':'respContent',
            'function':'respContent()'
        }

    ];

    $scope.respContent = function(){
        var respContent = document.getElementById("content").outerHTML;
        var iframe = document.getElementsByTagName('iframe')[0].contentDocument.getElementsByTagName('body')[0].innerHTML;
        document.getElementsByTagName('iframe')[0].contentDocument.getElementsByTagName('body')[0].children['content'].outerHTML = respContent;
        console.log(document.getElementsByTagName('iframe')[0].contentDocument.getElementsByTagName('body')[0].children);
    };

    $scope.format = function (a, b) {
        if (window.getSelection().toString().length > 0) {
            document.execCommand(a, false, b);
        }
    };
    $scope.addClass = function(a){
        if (document.getSelection().baseNode.parentNode.className == a){
            var content = document.getSelection().baseNode.parentNode.classList;
            content.remove(a);
        } else
        {
            document.execCommand("insertHTML", false, "<span class='" + a + "'>" + document.getSelection() + "</span>");
        }
    };
    $scope.ElementSize = function(a,b){

        var grillClass = document.getSelection().baseNode.parentNode.classList[1];
        if ( grillClass == a + "1" || grillClass == a + "2" || grillClass == a + "3" || grillClass == a + "4" || grillClass == a + "5" || grillClass == a + "6" || grillClass == a + "7" || grillClass == a + "8" || grillClass == a + "9" || grillClass == a + "10" || grillClass == a + "11" || grillClass == a + "12"){
            var content = document.getSelection().baseNode.parentNode.classList;
            content.remove(a + "1");
            content.remove(a + "2");
            content.remove(a + "3");
            content.remove(a + "4");
            content.remove(a + "5");
            content.remove(a + "6");
            content.remove(a + "7");
            content.remove(a + "8");
            content.remove(a + "9");
            content.remove(a + "10");
            content.remove(a + "11");
            content.remove(a + "12");
            content.add(a + b);
        } else
        {
            range = window.getSelection().getRangeAt(0);
            var div = document.createElement("div");
            div.innerHTML = "<div class='column " + a + b + " fleft'>" + range + "</div>";
            range.deleteContents();
            var frag = document.createDocumentFragment(), child;
            while ( (child = div.firstChild) ) {
                frag.appendChild(child);
            }
            range.insertNode(frag);
            //document.execCommand("insertHTML", false, "<div class='column " + a + b + " fleft'>" + document.getSelection() + "</div>");
        }
    };
    $scope.ElementFloat = function(a){

        var floatClass = document.getSelection().baseNode.parentNode.classList;
        var Classes = [];
        angular.forEach(floatClass, function(value, key){
            this.push(value);
        }, Classes);
        if ( Classes == "fleft" || Classes == "fright"  || Classes == "fnone"){
            var content = document.getSelection().baseNode.parentNode.classList;
            content.remove("fleft");
            content.remove("fright");
            content.remove("fnone");
            content.add(a);
        } else
        {
            range = window.getSelection().getRangeAt(0);
            var div = document.createElement("div");
            div.innerHTML = "<div class='" + a + "'>" + range + "</div>";
            range.deleteContents();
            var frag = document.createDocumentFragment(), child;
            while ( (child = div.firstChild) ) {
                frag.appendChild(child);
            }
            range.insertNode(frag);
        }
    };
    $scope.addImage = function(){
        document.execCommand("InsertImage", false, "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/c164.50.631.631/s160x160/6666_270678749734956_1212804806_n.jpg?oh=40e1735e69dfb4a58d5d2296a0888508&oe=54D4452A&__gda__=1423051032_5172d7e5249daba8915056c06df5653b");
        var last = document.getElementById("content").getElementsByTagName('img').length;
        console.log(document.getElementById("content").getElementsByTagName('img')[last-1])
        document.getElementById("content").getElementsByTagName('img')[last-1].classList.add("width100p");
    };
    $scope.createDiv = function(html1, html2) {
        var range, html1, html2;
        if (window.getSelection && window.getSelection().getRangeAt) {
            range = window.getSelection().getRangeAt(0);
            var div = document.createElement("div");
            div.innerHTML = html1 + range + html2;
            range.deleteContents();
            var frag = document.createDocumentFragment(), child;
            while ( (child = div.firstChild) ) {
                frag.appendChild(child);
            }
            range.insertNode(frag);
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.pasteHTML(html);
        }
    };
    $scope.imgs = [];
    var len = $scope.imgs.length;
    $scope.selected = $scope.imgs[0];
    $scope.isSelected = function (img) {
        return $scope.selected === img;
    };


    var selectedScopeIndex;

    function next() {
        for (selectedScopeIndex = 0; selectedScopeIndex < len; selectedScopeIndex++) {
            if ($scope.imgs[selectedScopeIndex] == $scope.selected) {
                break;
            }
        }


        if (selectedScopeIndex == len - 1) {
            selectedScopeIndex = 0;
        } else {
            selectedScopeIndex++;
        }
        $scope.selected = $scope.imgs[selectedScopeIndex];
        $timeout(next, 4000);
    }

    next();
    $scope.carousel = function() {
        $scope.imgs = [
            {"id": 0, "name": "Info1", "content": "<img src='images/1.jpg'/>"},
            {"id": 1, "name": "Info2", "content": "<img src='images/2.jpg'/>"},
            {"id": 2, "name": "Info3", "content": "<img src='images/3.jpg'/>"}
        ];
        var len = $scope.imgs.length;
        $scope.selected = $scope.imgs[0];
        $scope.isSelected = function (img) {
            return $scope.selected === img;
        };


        var selectedScopeIndex;

        function next() {
            for (selectedScopeIndex = 0; selectedScopeIndex < len; selectedScopeIndex++) {
                if ($scope.imgs[selectedScopeIndex] == $scope.selected) {
                    break;
                }
            }


            if (selectedScopeIndex == len - 1) {
                selectedScopeIndex = 0;
            } else {
                selectedScopeIndex++;
            }
            $scope.selected = $scope.imgs[selectedScopeIndex];
            $timeout(next, 4000);
        }

        next();
        /*var imgs = $scope.imgs;
        var content = [];
        angular.forEach(imgs, function(value, key) {
            console.log(value.content);
            this.push('<div class="animate-show carouselContent ng-binding ng-scope" ng-show="selected.name == ' + value.name + '">' + value.content + '</div>');
        }, content);
        console.log(content);
        var html = a + content + b;
        console.log(html)
        /*for(var img in $scope.imgs) {
            imgContent[img.id] = '<div class="animate-show carouselContent" ng-show="selected.name ==' +  img.name + '>';
        }
        console.log(imgContent)
        var range;
        if (window.getSelection && window.getSelection().getRangeAt) {
            range = window.getSelection().getRangeAt(0);
            var div = document.createElement("div");
            div.innerHTML = html;
            range.deleteContents();
            var frag = document.createDocumentFragment(), child;
            while ((child = div.firstChild)) {
                frag.appendChild(child);
            }
            range.insertNode(frag);

        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.pasteHTML(html);


        }*/

    };
});