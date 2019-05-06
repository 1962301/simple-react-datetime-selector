import React from 'react';
import ReactDOM from 'react-dom';
export default class DateTimeSelector extends React.Component{	
	//provide parameter called "value" as initiallization if value is mission the default value for this.setTempDateTime( will be empty.
	//provide a called "setValue" to set the this.setTempDateTime( value to it's parent. the parameter for setValue 
	constructor(props){
		super(props);
		this.state={datetime:""};
		this.tempDateTime={};
		this.initialize();
		this.timeInput=["hour","minute","second","millisecond"];
		this.arrow=["timeArrowTop","timeArrowBottom"];
		this.activeID="";
		this.active=false;
	}

		//default this.setTempDateTime( style is "2019-04-30T17:58:30.300"

	//initialize this.setTempDateTime(
	initialize(){
		var timeStyleReg=new RegExp(/^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/);
		if(this.props===null||this.props.value===undefined){
			console.log("if no setValue provided, current this.setTempDateTime( will be used to initialize");
		}
		else if(timeStyleReg.test(this.props.value)){
			this.setTempDateTime(this.props.value);
		}
		else{
			console.log(this.props+"  "+"please provide correct format, example:2019-04-30T17:58:30.300");
		}
	}

	setTempDateTime(value){
		this.tempDateTime={
			date:value.split("T")[0],
			hour:value.split("T")[1].split(":")[0],
			minute:value.split("T")[1].split(":")[1],
			second:value.split("T")[1].split(":")[2].split(".")[0],
			millisecond:value.split("T")[1].split(".")[1]
		}
	}

	updateDateTime(value){
		if(this.props.setValue!==undefined) this.props.setValue(value);	//you can change the callback function
		else{
			this.setTempDateTime(value)
			this.setState({datetime:value});
		}
	}
	getDateTime(){
		return this.tempDateTime.date+"T"+this.tempDateTime.hour+":"+this.tempDateTime.minute+":"+this.tempDateTime.second+"."+this.tempDateTime.millisecond;
	}
	
	handleChange=(e)=>{
		let value="";
		if((value=this.validTimeValue(e.target.id,e.target.value))!==this.tempDateTime[e.target.id]){
			this.tempDateTime[e.target.id]=value;
			this.updateDateTime(this.getDateTime());
		}
	}

	
	
	handleTimeKeyDown=(e)=>{
		console.log(e.keyCode);
		if((e.keyCode>=48&&e.keyCode<=57)||(e.keyCode>=96&&e.keyCode<=105)){
		}
		else if(e.keyCode===37||e.keyCode===38||e.keyCode===39||e.keyCode===40||e.keyCode===8){
		}
		else e.preventDefault();
	}
	
	onBlur=(e)=>{
		this.padZero(e.target.id,e.target.value,e.target.id==="millisecond"?4:3);
		this.active=false;
		this.updateDateTime(this.getDateTime());
	}

	padZero(id,value,n){
		this.tempDateTime[id]=Array(n-value.length).join("0")+value;
	}


	handleArrowMouseDown=(e)=>{
		e.preventDefault();
	}
	handleTimeArrowClick=(e)=>{
		e.preventDefault();
		if(!this.props.disabled&&this.active){
			let id=this.activeID;		
			if(id==="hour"||id==="minute"||id==="second"||id==="millisecond"){
				let v=this.validTimeValue(id,(parseInt(this.tempDateTime[id])+(e.target.id==="timeArrowTop"?(this.tempDateTime[id]==="999"?0:1):parseInt(this.tempDateTime[id])===0?0:-1)).toString());
				if(this.tempDateTime[id]!==v){
					this.tempDateTime[id]=v;
					this.updateDateTime(this.getDateTime());
				}
			}
		}
	}

	validTimeValue(id,value){
		if(id!=="date"){
			let i=parseInt(value);
			if(i<0) value="0";
			else if(id==="hour")						value=i>23?"23":i.toString();
			else if(id==="second"||id==="minute")		value=i>59?"59":i.toString();
			else if(id==="millisecond")					value=i>999?"999":i.toString();
		}
		return value;	
	}

	onFocus=(e)=>{
		this.activeID=e.target.id;
		this.active=true;
	}

	render(){
		return(
			<fieldset id="datetimeFieldSet" className={"datetimeFieldSet"} disabled={this.props.disabled}>
				<input type="date" id="date" className={"input"+" "+"date"} value={this.tempDateTime.date} onFocus={this.onFocus} onBlur={this.onBlur} onChange={(e)=>this.handleChange(e)} />
				<div id="timeOuterDiv" className={"timeOuterDiv"}>
					{this.timeInput.map((item)=> <input id={item} key={"input"+item} className={item+" "+"timeInput"+" "+(item==="hour"?"input":"")} type="number" onFocus={this.onFocus}value={this.tempDateTime[item]} onBlur={this.onBlur}	onChange={this.handleChange} onKeyDown={this.handleTimeKeyDown}/>)}
					<div id="timeArrowDiv"	className={"timeArrowDiv"}>
						{this.arrow.map((item)=><div id={item} 	key={"arrow"+item}	onMouseDown={(e)=>this.handleArrowMouseDown(e)}	onClick={(e)=>this.handleTimeArrowClick(e)}	className={item}></div>)}
					</div>
					<div className={"timeColon1"}>:</div>
					<div className={"timeColon2"}>:</div>
					<div className={"timeDot"}>.</div>
				</div>
			</fieldset>
		)
	}
}

ReactDOM.render(<DateTimeSelector value="2019-04-30T17:58:30.300"/>, document.getElementById("datetime")||document.createElement('div'));	//delete later one after testing
