import { subscriptionsList } from "../../core/products"
import { PricingTableItem } from "./PricingTableItem"

export const  PricingTable = ()=>{
return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start  justify-items-stretch">
{subscriptionsList.map((subscription)=><PricingTableItem subscriptionItem={subscription} key={subscription.title} />)}
</div>
)
}