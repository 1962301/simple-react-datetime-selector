import React from 'react';
import ReactDOM from 'react-dom';
import DateTimeSelector from '../js src/DateTimeSelector.js';

const wrapper = mount(<DateTimeSelector value="2019-04-30T17:58:30.300"/>);
const instance=wrapper.instance();
function restore(){
	instance.active=false;
	instance.activeID="";
}

afterEach(()=> restore());

describe('<DateTimeSelector/>', () => {
  it('should render with no error', () => {
    expect(wrapper).not.toBe(null);
  });

  it('should have 5 inputs',()=>{
  	expect(wrapper.find('input')).toHaveLength(5);
  });

  it('should first input have value as date',()=>{
  	expect(wrapper.find('input').first().prop("value")).toEqual(expect.stringMatching(/^\d{4}\-\d{2}\-\d{2}/));
  });
  it('check updateDateTime',()=>{
  	instance.updateDateTime("2019-04-30T17:58:30.300");
  	expect(instance.state.datetime).toBe("2019-04-30T17:58:30.300");
  	expect(instance.getDateTime()).toBe("2019-04-30T17:58:30.300");
  })

  it('check click timeArrow',()=>{				
  	instance.active=true;

  	["hour","second","minute","millisecond"].map((item)=>{
  		instance.activeID=item;
  		let oldv=Number(instance.tempDateTime[item]);
  		wrapper.find("#timeArrowTop").simulate('click');
  		expect(oldv+1).toBe(Number(instance.tempDateTime[item]));
  		wrapper.find("#timeArrowBottom").simulate('click');
  		expect(oldv).toBe(Number(instance.tempDateTime[item]));
  	});
  });

  it('check time limit by clicking time Arrow and blur event',()=>{
  	var mockClick=function(item,name){
  		for(let i=0;i<(item==="millisecond"?1000:60);i++){
  			wrapper.find(name).simulate('click');
  		}
  	};

  	["hour","second","minute","millisecond"].map((item)=>{
  		wrapper.find("#"+item).simulate('focus');
  		expect(instance.active).toBeTruthy();
  		expect(instance.activeID).toBe(item);

  		mockClick(item,"#timeArrowTop");
  		expect(instance.tempDateTime[item]).toBe(item==="hour"?"23":item==="millisecond"?"999":"59");

  		mockClick(item,"#timeArrowBottom");
  		expect(Number(instance.tempDateTime[item])).toBe(0);
  		
  		wrapper.find("#"+item).simulate('blur');
  		expect(instance.active).toBeFalsy();
  		expect(instance.tempDateTime[item]).toBe(item==="millisecond"?"000":"00");

  	});
  });
  it('check change',()=>{
  	instance.updateDateTime("2019-04-30T17:58:30.300");

  	["hour","second","minute","millisecond"].map((item)=>{
  		wrapper.find("#"+item).simulate('change',{target:{value:"999",id:item}});
  		expect(instance.tempDateTime[item]).toBe(item==="hour"?"23":item==="millisecond"?"999":"59");

  		wrapper.find("#"+item).simulate('change',{target:{value:"-10",id:item}});
  		wrapper.find("#"+item).simulate('blur');
  		expect(instance.tempDateTime[item]).toBe(item==="millisecond"?"000":"00");

  	});
  })
});
