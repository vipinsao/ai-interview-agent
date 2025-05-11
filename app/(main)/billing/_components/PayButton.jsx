import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";

function PayButton({ amount, credits }) {
  const { user } = useUser();
  const onPaymentSuccess = async () => {
    const { data, error } = await supabase
      .from("Users")
      .update({ credits: Number(user?.credits) + credits })
      .eq("email", user?.email)
      .select();

    toast("Successfully added credits!");
    window.location.reload();
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 cursor-pointer">
            Purchase Credits
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Proceed to buy -</DialogTitle>
            <DialogDescription asChild>
              <div className="paypal-container w-full max-w-xs mx-auto scale-95 overflow-x-scroll">
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  onApprove={() => onPaymentSuccess()}
                  onCancel={() => toast("Payment Canceled!")}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: amount,
                            currency_code: "USD",
                          },
                        },
                      ],
                    });
                  }}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PayButton;
