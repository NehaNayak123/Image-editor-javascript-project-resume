const fileInput=document.querySelector(".file-input"),
chooseImgBtn=document.querySelector('.choose-img-btn');
const saveImgBtn=document.querySelector('.save-img-btn');
let previewImg=document.querySelector(".preview-img img");
let filterOptions=document.querySelectorAll(".filter button");
let rotateOptions=document.querySelectorAll(".rotate button");
const filterName=document.querySelector(".filter-info .name");
const filterValue=document.querySelector(".filter-info .value");
const filterSlider=document.querySelector(".slider input");
const resetFilterBtn=document.querySelector(".reset-filter");


let brightness=100, saturation=100, inversion=0, grayscale=0;
let rotate=0, flipHorizontal=1, flipVertical=1;
const applyfilter=()=>{
    previewImg.style.transform=`rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter=
    `brightness(${brightness}%)
     saturate(${saturation}%)
     invert(${inversion}%)
     grayscale(${grayscale}%)
    `;
}
const loadImage=()=>{
    let file=fileInput.files[0];//getting user selected file
    // console.log(file);
    if(!file) return; //return if user has not selected file
    previewImg.src=URL.createObjectURL(file);//passing file url as preview img src
    previewImg.addEventListener("load", ()=>{
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable")
    })
}
filterOptions.forEach(option=>{
    option.addEventListener("click", ()=>{//adding click event listener to all filter buttons
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText=option.innerText;

        if(option.id === "brightness"){
            filterSlider.max=200;
            filterSlider.value=brightness;
            filterValue.innerText=`${brightness}%`;
        }else if(option.id==="saturation"){
            filterSlider.max=200;
            filterSlider.value=saturation;
            filterValue.innerText=`${saturation}%`;
        }else if(option.id==="inversion"){
            filterSlider.max=100;
            filterSlider.value=inversion;
            filterValue.innerText=`${inversion}%`;
        }else{
            filterSlider.max=100;
            filterSlider.value=grayscale;
            filterValue.innerText=`${grayscale}%`;
        }
    })
})

const updatefilter=()=>{
    // console.log(filterSlider.value);
    filterValue.innerText=`${filterSlider.value}%`;
    const selectedFilter=document.querySelector('.filter .active');//getting selected filter btn
    if(selectedFilter.id==="brightness"){
        brightness=filterSlider.value;
    }else if(selectedFilter.id==="saturation"){
        saturation=filterSlider.value;
    }else if(selectedFilter.id==="inversion"){
        inversion=filterSlider.value;
    }else{
        grayscale=filterSlider.value;
    }
    applyfilter();
}

rotateOptions.forEach(option=>{
    option.addEventListener("click", ()=>{//adding click event listener to all rotate button
        // console.log(option);
        if(option.id==="left"){
            rotate -=90;//if clicked btn is left-rotate, decrement rotate value by -90
        }else if(option.id==="right"){
            rotate +=90;//if clicked btn is right-rotate, increment rotate value by -90
        }else if(option.id==="horizontal"){
            flipHorizontal= flipHorizontal===1 ? -1 :1;
        }else{
            flipVertical= flipVertical===1 ? -1 :1;
        }
        applyfilter();
    });
})

const resetFilter=()=>{
    //reset all variables to its default value
    brightness=100;
    saturation=100;
    inversion=0; 
    grayscale=0;
    rotate=0; 
    flipHorizontal=1;
    flipVertical=1;
    filterOptions[0].click();//clicking brightness btn so that brightness selected by default
    applyfilter();
}

const saveImage=()=>{
    // console.log('save-img');
    const canvas=document.createElement("canvas");//creating canvas element
    const ctx= canvas.getContext("2d");//returns a drawing context on the canvas
    canvas.width= previewImg.naturalWidth;
    canvas.height= previewImg.naturalHeight;
    ctx.filter=
    `brightness(${brightness}%)
    saturate(${saturation}%)
    invert(${inversion}%)
    grayscale(${grayscale}%)
   `;
   ctx.translate(canvas.width/2, canvas.height/2);
   if(rotate !== 0){
    ctx.rotate(rotate*Math.PI/180)
   }
    ctx.scale(flipHorizontal,flipVertical);
    ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    // document.body.appendChild(canvas);

    const link=document.createElement("a");
    link.download="image.jpg";
    link.href=canvas.toDataURL();
    link.click();//to download
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updatefilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", ()=>fileInput.click());//1st step choose img
