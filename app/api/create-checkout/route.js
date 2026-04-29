import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16', // Usa la versión actual
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { locationId, packageSize } = body;

    if (!locationId || !packageSize) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Calcula el precio en centavos, esto dependerá de la lógica de precios
    // Mock: $10 por 1000 mensajes => 1000 centavos
    const amount = (packageSize / 1000) * 1000; 

    // Aquí n8n escuchará el webhook stripe.payment.success y actualizará messages_limit en Sheet 1
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Recarga de ${packageSize} mensajes de IA`,
              description: 'Compra de mensajes para el asistente de IA.',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?id=${locationId}&success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?id=${locationId}&canceled=true`,
      metadata: {
        location_id: locationId,
        package_size: packageSize,
        source: "ai_dashboard"
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error('Stripe API Error:', error);
    return NextResponse.json({ error: 'Error al crear la sesión de pago' }, { status: 500 });
  }
}
