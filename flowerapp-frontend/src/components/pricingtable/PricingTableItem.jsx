export const PricingTableItem = ({subscriptionItem})=>{
  return (
     <div
                className="p-2"
                
              >
                <div className="flex flex-col  transform  rounded-lg shadow-2xl group relative cursor-pointer hover:shadow-2xl ">
                  <div className={`w-full  px-4 py-6 rounded-t-lg card-section-1 border-b-2 border-gray-600 ${subscriptionItem.className}`}>
                  <div className=" flex justify-center items-center">
                      <span className="text-base rounded-md shadow-md bg-white p-1 text-center transform transition duration-150 ease-in-out">
                      {subscriptionItem.tag} 
                    </span>
                  </div>
                 {subscriptionItem.icon}
                      <h3 className="mx-auto text-white text-3xl font-semibold my-4 text-center transform transition duration-150 ease-in-out">
                      {subscriptionItem.title}
                    </h3>
                      <p className="text-3xl text-white font-bold text-center ">
                      ${subscriptionItem.price.split(".")[0]}.
                      <span className="text-2xl">
                        {subscriptionItem.price.split(".")[1]}
                      </span>
                    </p>
                    <p className="text-xs text-white text-center uppercase  ">
                      {subscriptionItem.type}
                    </p>
                  </div>
                  <ul className="flex flex-col justify-center items-center">
                    {subscriptionItem.description.map((des)=> (<li key={des} className=" w-full font-semibold text-center py-4 px-6 bg-gray-100 odd:shadow odd:bg-gray-50 even:bg-slate-50 text-gray-500">{des}</li>))}
                  </ul>
                  <div className="flex flex-col items-center justify-center w-full h-full py-6 rounded-b-lg ">
                  
                    <a
                    target="_blank"
                      className={` text-center text-white rounded-lg p-2 text-base    hover:text-teal-500 focus:outline-none focus:shadow-outline ${subscriptionItem.className}`}
                      href={subscriptionItem.link}
                    >
                   { subscriptionItem.buttonText}
                    </a>
       
           


                  
                  </div>
                </div>
              </div>
  )
}