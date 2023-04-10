
const APILINK = "http://localhost:8000/api/v1/todolist";


const addVal = document.querySelector('.addVal');
const list = document.getElementsByClassName('list')[0];

fetch(APILINK).then((res)=>res.json()).then(function(data){
     console.log(data)
     data.forEach(list1=>{
            
            const newValue = document.createElement('li');
            newValue.dataset.objId = list1._id;
            newValue.dataset.activity = list1.activity;
            newValue.dataset.completed = list1.status;
            const divv1 = document.createElement('div');
            const divv2 = document.createElement('div');
            const divv3 = document.createElement('div');
            newValue.appendChild(divv1);
            newValue.appendChild(divv2);
            newValue.appendChild(divv3);
            divv2.id = "buttons";
            divv3.id = "buttons2";
            const input = list1.activity;
            const newText = document.createTextNode(input);
            divv1.appendChild(newText);
            divv2.innerHTML='<i class="fa-sharp fa-solid fa-check"></i>';
            divv3.innerHTML='<i class="fa-sharp fa-solid fa-trash"></i>'
            const i = divv2.firstChild;
            const i2 = divv3.firstChild;
            css(newValue, {
                'background-color': 'rgb(237, 212, 175)',
                'width': '395px',
                'height':'50px',
                'border': 'solid',
                'border-color': 'rgb(232, 181, 103)',
                'border-radius':'15px',
                'margin-top':"10px",
                'display':'flex',
                'align-items':'center',
                'padding-left':'5px',

            });
            css(divv1,{
                'margin-left':'10px',
                'font-family': 'Verdana, Geneva, Tahoma, sans-serif',
                'width':'350px'
            });
            css(divv2,{
                'display':'flex',
                'justify-content': 'space-between',
                'padding-right':'5px'
             });
            css(divv3,{
                'display':'flex',
                'justify-content': 'space-between',
                'padding-right':'5px'
            });
            css(i,{
                'padding-right':'20px',
                'color':'green'
            });
            css(i2,{
                'padding-right':'10px',
                'color':'red'
            }); 
            if(list1.status == "true")
            {
                divv1.style.textDecoration = 'line-through'
            }
            if(input !== "")
            {
                list.appendChild(newValue);
                document.getElementsByClassName('input')[0].value = "";
            }
            
            const buttons = document.querySelectorAll("#buttons");
            buttons.forEach(button =>{
                button.addEventListener('click', function(e){
                const sibling = button.previousElementSibling;
                const parent = sibling.parentElement;
                const objId = parent.dataset.objId;
                const activity = parent.dataset.activity;
                console.log(objId);
                let completed = parent.dataset.completed;
                console.log(completed);
                completed = completed == "true" ? "false" : "true";
                console.log(completed);
                console.log(parent);
                fetch(APILINK+"/"+objId,{
                    method: 'PUT',
                    headers:{
                        'Accept': 'application/json,text/plain,*/*',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({"activity":activity,"status":completed})
                }).then(res=>{
                    res.json()
                    if(completed == "true")
                    {
                        console.log("line through");
                        sibling.style.textDecoration ='line-through';  
                    }
                    else{
                        console.log("none");
                        sibling.style.textDecoration ='none';
                    }
                    location.reload();
                });
                
                });
            });  

            const buttons2 = document.querySelectorAll("#buttons2");
            buttons2.forEach(button =>{
                
                button.addEventListener('click', function(e){
                    const sibling = button.closest('li');
                    const objId = sibling.dataset.objId;
                    fetch(APILINK+"/"+objId,{
                        method:'DELETE'
                    }).then(res=>{
                        console.log(e)
                        console.log(res);
                    })
                    sibling.remove();
                });
            });  
        })
})

addVal.addEventListener('click',function(){
    const input = document.getElementsByClassName('input')[0].value;
    if(input != "")
    {
        console.log("Added");
        fetch(APILINK,{
            method: 'POST',
            headers:{
                'Accept': 'application/json,text/plain,*/*',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"activity" : input,"status": "false"})
        }).then((res)=>{res.json()}).then(location.reload());
    }
    
});

function css(element, style) {
    for (const property in style)
        element.style[property] = style[property];
}
