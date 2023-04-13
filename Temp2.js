//CaseDetails JS

console.log("payload",payload);


//Initialize all basicInfo

var self=this;
self.pg_roleName=ecm.model.desktop.currentRole.name;
self.pg_userId=ecm.model.desktop.userId;
self.pg_userName=ecm.model.desktop.userDisplayName;
self.pg_prefix=this.solution.getPrefix();
self.pg_eventName=payload.eventName;
self.pg_coordination=payload.coordination;

//,"dojo/model/Teamspace"

require(["icm/base/Constants","icm/model/properties/controller/ControllerManager","dojo/_base/lang","dojo/_base/array"],

function(Constants,ControllerManager,lang,array){

	//check the event
	if(self.pg_eventName=="icm.SendWorkItem"){
		//debugger;
		//fetch the propsCollection from payLoad
		self.pg_editable=payload.workItemEditable;
		self.pg_propCollectionController=ControllerManager.bind(self.pg_editable);
		
		//participate/write code in the coordination topic callback hook
		self.pg_coordination.participate(Constants.CoordTopic.LOADWIDGET,
		function(context,complete,abort){
			complete();
		});

	}
	

	

	if(self.pg_eventName=="icm.PropertyUpdated"){
		
		debugger;
		
		//fetch the propsCollection from payLoad
		
		//self.pg_editable=payload.taskEditable;
		self.propValue=payload.value;
		var propId=payload.property.binding;
		
		
		
		self.pg_propCollectionController=ControllerManager.bind(self.pg_editable);
		
		if(propId=="F_CaseTask.LINUX_TaskType"){
			
			if(self.propValue=="DITM"){
				var date=new Date();
				date.setDate(date.getDate() + 2);
				setPropValue("LINUX_DueDatetime",date,"F_CaseTask");
				
			}else if(self.propValue==""||self.propValue==null){
				setPropValue("LINUX_DueDatetime",null,"F_CaseTask");
			}
			
			
			
		}
		
		

	}
	//Utility to setPropValue
	function setPropValue(propertyId,value,context){
		if(self.pg_editable.propertiesCollection.hasOwnProperty(propertyId)){
			var propController=self.pg_propCollectionController.getPropertyController(context,propertyId);
			if(propController!=undefined && propController!=null){
				propController.set("value",value);
			}else{
				console.log(propertyId+" controller is undefined for this action");
			}
		}
		
	}





});

