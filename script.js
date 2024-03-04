

// allpost section ar funtionality start 

const AllPost = async (categoryName = 'comedy') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    const data = await res.json();
    const allPostSection = document.getElementById("allPost");
    allPostSection.textContent='';
    data.posts.forEach((item) => {
           const div = document.createElement("div")
           
        div.classList.add('flex', 'gap-5', 'lg:p-10', 'p-2', 'rounded-3xl', 'bg-[#12132d0c]')
        div.innerHTML = `
        <div class="w-[50px] h-[50px] ">
            <img class="rounded-full" src="${item.image}" alt="">
            </div>
            
            <div class="space-y-2">
                <div class="flex gap-5 font-semibold">
                    <p>${item.id} ${item.category}</p>
                    <p>Author : ${item.author.name}</p>
                </div>

                <h1 class="text-lg font-bold">
                    ${item.title}
                </h1>
                <p class="text-black lg:w-[550px]">
                    ${item.description}
                </p>

                <hr class="border-dashed border-2">

                <div class="flex justify-between lg:text-lg">
                     <div class="flex gap-6 text-black font-semibold">
                        <p class="space-x-2"><i class="fa-regular fa-message "></i> <span>${item.comment_count}</span></p>
                        <p class="space-x-2"><i class="fa-regular fa-eye "></i> <span>${item.view_count}</span></p>
                        <p class="space-x-2"><i class="fa-regular fa-clock "></i> <span>${item.posted_time}</span></p>
                    </div>
                    <div class="flex justify-center items-center bg-blue-400 rounded-full px-2 py-1">
                        <button onclick="details('${item.title}', ${item.view_count})" id="read-button"><i class="fa-regular fa-envelope text-white"></i></button>
                    </div>
                </div>
            </div>
        `;
        allPostSection.appendChild(div);
         runSpinner(false)
    })
}


// details functionality system
let veri =0;

const details = (there,share ) =>{

    veri ++;
    const btnclick = document.getElementById('updateNumber');
    btnclick.innerText=veri;

    console.log(there,share)
    const countingOption = document.getElementById('counting-option');

    const newDiv = document.createElement('div');
    newDiv.classList.add('flex', 'justify-between', 'items-center', 'bg-white', 'p-4', 'rounded-2xl')
    newDiv.innerHTML=`
    <p class="font-medium">${there}</p>
    <p class="space-x-1 text-[#868585]"><i class="fa-regular fa-eye "></i> <span> ${share} </span>
    </p>
    
    `
    countingOption.appendChild(newDiv);

}
const searchtbn=()=>{
    runSpinner(true);
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;
    AllPost(inputFieldText);
}

const runSpinner = (loading)=>{
    const spinner =document.getElementById('loadingSpinner');
    if(loading){
        spinner.classList.remove('hidden')
    }
    else{
        spinner.classList.add('hidden')
    }
}
// latest Section ar functionality start  all 

const latestPostApi = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts")
    const data = await res.json();

    const latestPost = document.getElementById("latestPostItem")
    data.forEach((item) => {

        const div = document.createElement("div");
        div.classList.add('p-5', 'rounded-3xl', 'space-y-4', 'drop-shadow-xl', 'border');
        div.innerHTML = `
        
                    <div><img class="rounded-lg" src="${item.cover_image}" alt="nai"></div>
                    <div class="flex items-center gap-3">
                        <i class="fa-regular fa-calendar"></i>
                        <p>${item.author.posted_date ? item.author.posted_date : 'No Publish Date'}</p>
                    </div>
                    <h1 class="font-bold text-lg">${item.title.slice(0, 30)}</h1>
                    <p class="text-black">${item.description}
                    </p>
                    <div class="flex gap-4">
                        <div class="h-[40px] w-[40px] bg-black rounded-full"><img class="rounded-full" src="${item.profile_image}" alt="nai"></div>
                        <div>
                            <h4 class="font-bold">${item.author.name}</h4>
                            <p class="text-black">${item.author.posted_date ? item.author.posted_date : 'No Publish Date'}</p>
                        </div>
                    </div>
                
        `

        latestPost.appendChild(div);
    })

}
// Function Call 
latestPostApi();
AllPost();