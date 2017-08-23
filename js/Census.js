let count = 0;
let value=[],index=[],census =[],arr =[],state1=[],emp=[],val=[];
let i=0,val1=0,val2=0,val3=0,val4=0,val5=0,val6=0,val7=0,val8=0,val9=0,val10=0;
let female1=[],male1=[],LiterateWithoutEducation1=[];
let BelowPrimary1=[],Primary1=[],Middle1=[],MatricOrSecondary1=[];
let HigherSecondaryOrUniversity1=[],NonTechnical1=[];
let Technical1=[],GraduateAndAbove1=[],UnClassified1=[];
let employee = [];
//File creation
const readline = require('readline')    
const fs = require('fs')
const rl = readline.createInterface({									
	  input: fs.createReadStream('../CSV_Files/India2011.csv','utf-8')
	})
let myWriteStream = fs.createWriteStream('../Json/AgeCensus.json')
let myWriteStream1 = fs.createWriteStream('../Json/Population.json')
let myWriteStream2 = fs.createWriteStream('../Json/EducationCensus.json')
//line by line creation
rl.on('line',(line) => {
	line.split('\n')
  let arr = line.split(',');
	count++;
	//Add Literate_Population age wise for every state
	if(count!=1)
		{
	    if(arr[5]!='All ages' && arr[5]!='Age not stated'&&arr[5]!='0-6'){
				let age=arr[5];
				let prevalue=parseInt(arr[12]);
				let a=index.indexOf(age);			
				if(a>=0){
					value[a]+=prevalue;
				}else{
					index.push(age);
					value.push(prevalue);
				 }
	    }
    }
    // Takes the values from different columns from csv file
		if(i!=0){
			let male=parseInt(arr[40]);
			let female=parseInt(arr[41]);
			let state=arr[3];
			let total=arr[4];
			let age=arr[5];
			let LiterateWithoutEducation=parseInt(arr[15]);
		  let BelowPrimary=parseInt(arr[18]);
		  let Primary=parseInt(arr[21]);
	    let Middle=parseInt(arr[24]);
		  let MatricOrSecondary=parseInt(arr[27]);
		  let HigherSecondaryOrUniversity=parseInt(arr[30]);
		  let NonTechnical=parseInt(arr[33]);
		  let Technical=parseInt(arr[36]);
		  let GraduateAndAbove=parseInt(arr[39]);
		  let UnClassified=parseInt(arr[42]);
			if(total=="Total"&&age=="All ages")
			{
				state1.push(state);
				female1.push(female);
				male1.push(male);
				LiterateWithoutEducation1.push(LiterateWithoutEducation);
				BelowPrimary1.push(BelowPrimary);
				Primary1.push(Primary);
				Middle1.push(Middle);
				MatricOrSecondary1.push(MatricOrSecondary);
				HigherSecondaryOrUniversity1.push(HigherSecondaryOrUniversity);
				NonTechnical1.push(NonTechnical);
				Technical1.push(Technical);
				GraduateAndAbove1.push(GraduateAndAbove);
				UnClassified1.push(UnClassified);
			}
		}i++;});
		//Write data into json file
    rl.on('close',(func1)=>{
    	//Pushes data into array for AgeCensus.json file
      for(let k=0;k<index.length;k++){
	     census.push({"Index":index[k],
	      "Literate_Population" : value[k]
	    	}) 
 			}
			let Category=["LiterateWithoutEducation","BelowPrimary","Primary","Middle","MatricOrSecondary","HigherSecondaryOrUniversity","NonTechnical","Technical","GraduateAndAbove","UnClassified"];
 			//Pushes data into array for EducationCensus.json file
 			for(i in state1){
				employee[state1[i]] = employee[state1[i]] || [];
        employee.push({ "State":state1[i],
          "Male_Graduate": male1[i],
          "Female_Graduate": female1[i]
				})
				val1=val1+LiterateWithoutEducation1[i];
				val2=val2+BelowPrimary1[i];
				val3=val3+Primary1[i];
				val4=val4+Middle1[i];
				val5=val5+MatricOrSecondary1[i];
				val6=val6+HigherSecondaryOrUniversity1[i];
				val7=val7+NonTechnical1[i];
				val8=val8+Technical1[i];
				val9=val9+GraduateAndAbove1[i];
				val10=val10+UnClassified1[i];
			}  
				val.push(val1,val2,val3,val4,val5,val6,val7,val8,val9,val10);
				//Pushes data into array for Population.json file
				for(let j=0;j<10;j++)
				{
					emp.push({ "Category":Category[j],
          "Value": val[j]
				})
				}
				//Push on an array
				myWriteStream.write(JSON.stringify(census,null,2)); 
        myWriteStream1.write(JSON.stringify(employee,null,3));
        myWriteStream2.write(JSON.stringify(emp,null,1));
    });