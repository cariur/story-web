"use client";
import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  senderName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  senderMessage: z.string().min(1, {
    message: "Message is required.",
  }),
  amount: z.string().refine((val) => !isNaN(val) && Number(val) >= 1, {
    message: "Amount must be a number greater than or equal to 1.",
  }),
});

const TipPage = () => {
  const [upiLink, setUpiLink] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true); // State to manage form visibility
  const qrRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderName: "",
      senderMessage: "",
      amount: "",
    },
  });
  // kasimytcreation@okhdfcbank
  const onSubmit = (values) => {
    const upiId = "salman.khan23@ybl";
    const combinedMessage = `From: ${values.senderName}, Message: ${values.senderMessage}`;

    const link = `upi://pay?pa=${encodeURIComponent(
      upiId
    )}&pn=${encodeURIComponent("Kasim")}&am=${encodeURIComponent(
      values.amount
    )}&tn=${encodeURIComponent(
      combinedMessage
    )}&cu=INR&url=${encodeURIComponent(
      "https://stories-by-kasim.vercel.app/thankyou"
    )}`;

    setUpiLink(link);
    setIsFormVisible(false); // Hide the form when the QR code is generated
  };

  useEffect(() => {
    if (upiLink && qrRef.current) {
      QRCode.toCanvas(qrRef.current, upiLink, { width: 256 }, (error) => {
        if (error) console.error("Error generating QR code", error);
      });
    }
  }, [upiLink]);

  const handleRefillForm = () => {
    setIsFormVisible(true); // Show the form again
    setUpiLink(""); // Reset the UPI link
    form.reset(); // Reset the form fields
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-12 text-center">Tip</h1>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Enter Tip Details</CardTitle>
        </CardHeader>
        <CardContent>
          {isFormVisible ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="senderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="senderMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Thank you for your work!"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (INR)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full mt-8">
                  Generate Payment Link
                </Button>
              </form>
            </Form>
          ) : (
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">
                Scan QR Code to Pay
              </h3>
              <canvas ref={qrRef} className="mt-4" />
              <Button asChild className="mt-6">
                <a href={upiLink} target="_blank" rel="noopener noreferrer">
                  Pay via UPI App
                </a>
              </Button>
              <Button className="mt-4" onClick={handleRefillForm}>
                Refill Form
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TipPage;
