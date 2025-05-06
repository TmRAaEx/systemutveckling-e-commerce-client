import {IOrder} from "@interfaces/IOrder.ts";
import Price from "@components/UI/functional/PriceFormatter.tsx";
import Text from "@components/UI/styled/Text.tsx";

export default function Order({order}: { order: IOrder }) {
    const {customerDetails, payment_ref, lineItems, _id} = order;

    return (
        <div className="p-4 border rounded shadow-sm bg-white space-y-4">
            <h2 className="text-xl font-semibold">Order #{_id}</h2>

            <div className="text-sm md:text-md lg:text-lg text-gray-700">
                <Text
                    color={"text-inherit"}><strong>Customer:</strong> {customerDetails.firstName} {customerDetails.lastName}
                </Text>
                <Text color={"text-inherit"}><strong>Email:</strong> {customerDetails.email}</Text>
                <Text color={"text-inherit"}><strong>Address:</strong> {customerDetails.address}</Text>
                {payment_ref && (
                    <div style={{maxWidth: '100%', overflowWrap: 'break-word'}}
                         className="bg-gray-100 rounded-xl p-4 flex items-start justify-between gap-4">
                        <div className="flex-1 overflow-hidden">
                            <Text className="text-sm  font-semibold mb-1" color={"text-gray-600"}>Payment
                                Reference:</Text>
                            <Text className="text-sm  break-words line-clamp-2"
                                  color={"text-gray-800"}>{payment_ref}</Text>
                        </div>
                        <button
                            className="text-xs px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                            onClick={() => navigator.clipboard.writeText(payment_ref)}
                        >
                            Copy to clipboard
                        </button>
                    </div>
                )}

            </div>

            <div>
                <h3 className="font-medium mt-4">Items:</h3>
                <ul className="divide-y divide-gray-200">
                    {lineItems.map((item, index) => (
                        <li key={index} className="py-2 flex justify-between">
                            <div className={"w-[70%]"}>
                                <Text className="font-medium"
                                      color={"text-black"}>{item.product?.name || "Unnamed product"}</Text>
                                <Text className="text-sm"
                                      color={"text-gray-500"}>ID: {item.product?._id}</Text>
                            </div>
                            <div className="text-right">
                                <Text color={"text-black"}>Qty: {item.quantity}</Text>
                                <Text
                                    color={"text-black"}>{Price({price: item.product?.price || 0})}</Text>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
