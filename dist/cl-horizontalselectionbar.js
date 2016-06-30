define(["jquery","underscore","qlik","ng!$q","ng!$http","./properties","./initialproperties","./lib/js/extensionUtils","general.models/library/dimension","text!./lib/css/style.css","text!./lib/partials/template.html","./lib/js/clTouch"],function(a,b,c,d,e,f,g,h,i,j,k){"use strict";return h.addStyleToHeader(j),{definition:f,initialProperties:g,snapshot:{canTakeSnapshot:!1},"export":!1,exportData:!1,getDropFieldOptions:function(a,b,c,d){d()},getDropDimensionOptions:function(a,b,c,d){d()},getDropMeasureOptions:function(a,b,c,d){d()},resize:function(){this.$scope.sizeMode=a(document).width()<=this.$scope.resolutionBreakpoint?"SMALL":""},paint:function(b,c){this.$scope.sizeMode=a(document).width()<this.$scope.resolutionBreakpoint?"SMALL":"",this.$scope._inAnalysisState=this._inAnalysisState,this.$scope.setFields(c.kfLists),this.$scope.props=c.props,this.$scope.initSelectionsApplied||this.$scope.setInitSelections()},template:k,controller:["$scope","$element",function(d){var e=c.currApp();d.selections={field:"",swipe_idx_min:-1,swipe_idx_max:-1,values_to_select:[],selectionMode:""},d._inAnalysisState=!1,d.resolutionBreakpoint=1024,d.sizeMode="",d.fields=[],d.variables=[],d.willApplyInitSelections=!1,d.initSelectionsApplied=!1,d.sessionStorageId=d.$parent.layout.qExtendsId?d.$parent.layout.qExtendsId:d.$parent.layout.qInfo.qId,d.setFields=function(a){var c=[];b.each(a,function(a,d){var e=a.qListObject.qDataPages[0]?a.qListObject.qDataPages[0].qMatrix:[];switch(a.listType){case"FIELD":c.push({field:a.qListObject.qDimensionInfo.qGroupFieldDefs[0],type:a.listType,visible:a.listVisible,initSelection:a.initSelection,label:a.label,data:e});break;case"VARIABLE":for(var f=a.variableValues?a.variableValues.split(","):[],g=a.alternativeDimensions?a.alternativeDimensions.split(","):[],h=[],i=0;i<f.length;i++)h.push(f.length==g.length&&a.alternativeDim?{value:f[i],altDim:g[i]}:{value:f[i]});c.push({variable:a.variable,variableValue:a.variableValue,type:a.listType,visible:a.listVisible,initSelection:a.initSelection,label:a.label,data:h});break;case"FLAG":var h=[];b.each(e,function(a){var b=a[0].qText.replace(" ","-"),c=a;c.icon="/Extensions/cl-HorizontalSelectionBar/lib/images/flags/"+b+".png",h.push(c)}),c.push({field:a.qListObject.qDimensionInfo.qGroupFieldDefs[0],type:a.listType,visible:a.listVisible,initSelection:a.initSelection,label:a.label,data:h});break;default:this.$scope.fields[d]=null}}),d.fields=c},d.selectValue=function(a,b,c,e){d._inAnalysisState&&(a.ctrlKey?d.selectFieldValues(b,[d.getValue(c)],!1):d.selectFieldValues(b,[d.getValue(c)],e))},d.selectFieldValues=function(a,c,d){var f=[];b.each(c,function(a){f.push(JSON.parse(a))}),e.field(a).selectValues(f,d)},d.setVariable=function(a,b,c){c&&d.prepareAlternativeDimension(c),e.variable.setStringValue(a,b).then(function(){})},d.getValue=function(a){return JSON.stringify(isNaN(a.qNum)?{qText:a.qText}:a.qNum)},d.showField=function(a){return a.visible&&!b.isEmpty(a.data)},d.changeAlternativeDimensions=function(a,b,c,d){e.getObject(d).then(function(d){var e=[{qOp:"replace",qPath:"qHyperCubeDef/qDimensions/0",qValue:JSON.stringify(b)},{qOp:"replace",qPath:"qHyperCubeDef/qLayoutExclude/qHyperCubeDef/qDimensions/"+c,qValue:JSON.stringify(a)}];d.clearSoftPatches(),d.applyPatches(e,!0)})},d.prepareAlternativeDimension=function(a){var f=c.navigation.getCurrentSheetId();e.getObject(f.sheetId).then(function(c){var f=[];b.each(c.layout.cells,function(a){"linechart"==a.type&&f.push(a.name)}),b.each(f,function(c){e.getObjectProperties(c).then(function(f){e.getObject(c).then(function(e){if(e.clearSoftPatches(),f.properties.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qDimensions&&f.properties.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qDimensions.length>0){var g=f.properties.qHyperCubeDef.qDimensions[0];b.each(f.properties.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qDimensions,function(b,e){b.qLibraryId?i.getProperties(b.qLibraryId).then(function(f){a==f.properties.qDim.title&&d.changeAlternativeDimensions(g,b,e,c)}):b.qDef.qFieldLabels[0]==a&&d.changeAlternativeDimensions(g,b,e,c)})}})})})})},d.checkInitSelections=function(){var a=JSON.parse(sessionStorage.getItem(d.sessionStorageId)),b=a?a.selectionApplied:!1;b&&"ON_SHEET"!=d.layout.props.initSelectionMode||(d.willApplyInitSelections=!0)},d.setInitSelections=function(){if(d.willApplyInitSelections){b.each(d.fields,function(a){if(""!=a.initSelection&&"VARIABLE"!=a.type){var c=["=","<",">"];if(c.indexOf(a.initSelection.substring(0,1))>-1)e.field(a.field).clear(),e.field(a.field).selectMatch(a.initSelection);else{var f=a.initSelection.split(","),g=[];b.each(f,function(a){g.push(isNaN(a)?'{"qText": "'+a+'"}':a)}),d.selectFieldValues(a.field,g,!1)}}"VARIABLE"==a.type&&""!=a.initSelection&&d.setVariable(a.variable,a.initSelection)});var a={selectionApplied:!0};sessionStorage.setItem(d.sessionStorageId,JSON.stringify(a))}d.initSelectionsApplied=!0,d.willApplyInitSelections=!1},d.checkInitSelections(),d.onActivate=function(){},d.onSwipeStart=function(b){if(d._inAnalysisState){var c=a(b.target),e=a(b.target).index(),f=c.attr("field");d.selections.swipe_idx_min=e,d.selections.swipe_idx_max=e,d.selections.field=f;var g=c.attr("datavalue");d.selections.selectionsMode=!c.hasClass("S"),"undefined"!=typeof g&&g!==!1&&(d.selections.selectionsMode?(d.selections.values_to_select.push(g),c.removeClass("A X O"),c.addClass("S")):(d.selections.values_to_select.push(g),c.removeClass("S"),c.addClass("X")))}},d.onSwipeUpdate=function(b){if(d._inAnalysisState){var c=a(b.originalEvent.target),e=c.attr("field");if(e==d.selections.field){var f=a(b.originalEvent.target).index(),g=d.selections.swipe_idx_min>f||d.selections.swipe_idx_max<f;if(g){d.selections.swipe_idx_min=d.selections.swipe_idx_min>f?f:d.selections.swipe_idx_min,d.selections.swipe_idx_max=d.selections.swipe_idx_max<f?f:d.selections.swipe_idx_max;var h=a(b.originalEvent.target.parentElement.children);h.slice(d.selections.swipe_idx_min,d.selections.swipe_idx_max+1).each(function(){var b=this;if(d.selections.selectionsMode){if(!a(b).hasClass("S")){var c=a(b).attr("datavalue");-1==d.selections.values_to_select.indexOf(c)&&"undefined"!=typeof c&&c!==!1&&(d.selections.values_to_select.push(c),a(b).removeClass("A X O"),a(b).addClass("S"))}}else if(a(b).hasClass("S")){var c=a(b).attr("datavalue");-1==d.selections.values_to_select.indexOf(c)&&"undefined"!=typeof c&&c!==!1&&(d.selections.values_to_select.push(c),a(b).removeClass("S"),a(b).addClass("X"))}})}}}},d.onSwipeCancel=function(a){},d.onSwipe=function(){d._inAnalysisState&&(d.selections.swipe_idx_min=-1,d.selections.swipe_idx_max=-1,d.selections.values_to_select!==[]&&(d.selectFieldValues(d.selections.field,d.selections.values_to_select,!0),d.selections.values_to_select=[]),d.selections.field="")}}]}});