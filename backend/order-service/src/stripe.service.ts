import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
  async charge(
    amount: number,
    paymentMethodId: string,
  ): Promise<{ success: boolean; chargeId?: string }> {
    console.log(
      `Charging ${amount} with payment method ${paymentMethodId}...`,
    );
    // In a real application, you would integrate with the Stripe SDK here.
    // For this mock, we'll just simulate a successful payment.
    if (paymentMethodId === 'card_invalid') {
      return { success: false };
    }
    return { success: true, chargeId: `ch_${Math.random().toString(36).substring(7)}` };
  }
}
