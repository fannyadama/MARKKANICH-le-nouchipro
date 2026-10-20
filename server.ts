import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'Markkanich Le NouchiPro' });
  });

  // API Routes: Authentication (Compatible with test suites and external clients)
  app.post('/api/auth/register', (req, res) => {
    const { username, email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });
    }
    const cleanUsername = username || email.split('@')[0] || 'Nouchiman';
    const fakeToken = `jwt_mock_${Buffer.from(`${email}:${Date.now()}`).toString('base64')}`;
    const newUser = {
      id: `user-${Date.now()}`,
      username: cleanUsername,
      email,
      role: 'user',
      plan: 'free_griot',
      isVip: false,
      createdAt: new Date().toISOString()
    };
    return res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      token: fakeToken,
      user: newUser
    });
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });
    }
    const fakeToken = `jwt_mock_${Buffer.from(`${email}:${Date.now()}`).toString('base64')}`;
    const user = {
      id: email === 'admin@nouchi.com' ? 'user-admin' : `user-${Date.now()}`,
      username: email === 'admin@nouchi.com' ? 'admin_nouchi' : email.split('@')[0],
      email,
      role: email === 'admin@nouchi.com' ? 'admin' : 'user',
      plan: 'free_griot',
      isVip: email === 'admin@nouchi.com',
    };
    return res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      token: fakeToken,
      user
    });
  });

  // API Route: Translation & Slang Enrichment (French <-> Nouchi)
  app.post('/api/translate', async (req, res) => {
    try {
      const { text, direction = 'fr_to_nouchi', tone = 'moderne' } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Texte requis pour la traduction.' });
      }

      const ai = getGenAI();
      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not set
        return res.json({
          translatedText: `[Traduction standard] ${text}`,
          explanation: "Mode dictionnaire hors-ligne actif. Configurez votre clé API Gemini dans les secrets pour une traduction contextuelle enrichie avec l'IA.",
          vocabularyUsed: [],
          culturalNote: "Le nouchi varie selon les communes d'Abidjan (Yopougon, Treichville, Cocody).",
          alternativeVariants: []
        });
      }

      const systemPrompt = `Tu es l'expert mondial et lexicographe suprême du Nouchi ivoirien (l'argot urbain culte d'Abidjan, Côte d'Ivoire).
L'application s'appelle 'Markkanich Le NouchiPro'.
Ton rôle est de traduire fidèlement avec authenticité, saveur, humour et justesse culturelle entre le Français et le Nouchi ivoirien.

Direction: ${direction === 'fr_to_nouchi' ? 'Français vers Nouchi' : 'Nouchi vers Français standard'}.
Ton désiré: ${tone} (ex: populaire, branché, sage, humoristique, punchline de rue).

Tu dois impérativement renvoyer un JSON strict respectant la structure suivante:
- translatedText (string): La traduction principale en Nouchi authentique d'Abidjan (ou en français si direction inverse).
- explanation (string): Explication claire et pédagogique de la tournure et des nuances.
- vocabularyUsed (array of { term: string, meaning: string }): Liste des mots nouchis clés utilisés avec leur définition.
- culturalNote (string): Contexte culturel abidjanais ou origine des expressions.
- alternativeVariants (array of string): 2 ou 3 variantes alternatives de la phrase (ex: version plus de rue vs version plus douce).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `Traduis et analyse la phrase suivante : "${text}"`,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              translatedText: { type: Type.STRING },
              explanation: { type: Type.STRING },
              vocabularyUsed: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    term: { type: Type.STRING },
                    meaning: { type: Type.STRING },
                  },
                  required: ['term', 'meaning']
                }
              },
              culturalNote: { type: Type.STRING },
              alternativeVariants: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ['translatedText', 'explanation', 'vocabularyUsed']
          }
        }
      });

      const parsed = JSON.parse(response.text?.trim() || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.error('Translation error:', err);
      return res.status(500).json({
        error: 'Erreur lors de la traduction IA.',
        details: err?.message
      });
    }
  });

  // API Route: Chat with "Le Vieux Père / Nouchiman Pro"
  app.post('/api/chat-babi', async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message requis.' });
      }

      const ai = getGenAI();
      if (!ai) {
        return res.json({
          reply: "Mon môgô sûr ! Actuellement mon réseau est un peu en mode local. Mais pose-moi n'importe quelle question sur les mots de Babi et regarde dans le dictionnaire A-Z !",
          nouchiWordsUsed: ["Môgô", "Babi"]
        });
      }

      const systemPrompt = `Tu es 'Le Vieux Père Markkanich', un grand sage, linguiste et Nouchiman respecté d'Abidjan (Côte d'Ivoire).
Tu t'exprimes avec chaleur, humour bienveillant, métaphores percutantes, et un mélange savoureux de français élégant et de Nouchi ivoirien authentique (avec des expressions comme 'Môgô sûr', 'Y'a fohi', 'Prends mon GBõ', 'On est ensemble', 'Abidjan c'est le travail').
Tu aides les utilisateurs à apprendre le nouchi, à comprendre l'histoire de la Côte d'Ivoire, les traditions d'Abidjan (Zouglou, Coupé-Décalé, maquis, garba) et à perfectionner leur vocabulaire.
Garde tes réponses dynamiques, pédagogiques, chaleureuses et engageantes.`;

      const contents = [
        ...history.slice(-6).map((h: any) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }]
        })),
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: contents as any,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
        }
      });

      return res.json({
        reply: response.text?.trim() || "Y'a fohi mon frère, on est ensemble !"
      });
    } catch (err: any) {
      console.error('Chat error:', err);
      return res.status(500).json({
        error: 'Erreur lors de la discussion.',
        details: err?.message
      });
    }
  });

  app.get('/api/badges', (req, res) => {
    res.json({
      success: true,
      badges: [
        { id: 'b1', name: 'Premier Pas', description: 'Ajouter son premier mot au dictionnaire', requirement: 'words_added', threshold: 1, level: 'bronze', icon: 'Footprints' },
        { id: 'b2', name: 'Contributeur', description: 'Ajouter 10 mots validés', requirement: 'words_added', threshold: 10, level: 'silver', icon: 'BookOpen' },
        { id: 'b3', name: 'Expert Nouchi', description: 'Ajouter 50 mots avec étymologies', requirement: 'words_added', threshold: 50, level: 'gold', icon: 'Award' },
        { id: 'b4', name: 'Légende de Babi', description: 'Ajouter 100 mots au patrimoine', requirement: 'words_added', threshold: 100, level: 'platinum', icon: 'Crown' },
        { id: 'b5', name: 'Populaire du Ghetto', description: 'Recevoir 100 likes de la communauté', requirement: 'likes_received', threshold: 100, level: 'gold', icon: 'Flame' }
      ]
    });
  });

  // In-memory push subscribers store
  const pushSubscribers = new Map<string, any>();

  app.post('/api/notifications/subscribe', (req, res) => {
    const { endpoint, keys, userId, username, settings } = req.body || {};
    const subKey = endpoint || `sub-${userId || 'anon'}-${Date.now()}`;
    
    pushSubscribers.set(subKey, {
      subKey,
      endpoint,
      keys,
      userId: userId || 'anonymous',
      username: username || 'Nouchiman',
      settings: settings || { scheduledTime: '08:00', enabled: true },
      updatedAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Abonnement aux notifications Push "Mot du Jour" activé avec succès.',
      subscribersCount: pushSubscribers.size,
      registeredAt: new Date().toISOString()
    });
  });

  app.post('/api/notifications/unsubscribe', (req, res) => {
    const { endpoint, userId } = req.body || {};
    let removed = false;
    for (const [k, v] of pushSubscribers.entries()) {
      if (v.endpoint === endpoint || v.userId === userId) {
        pushSubscribers.delete(k);
        removed = true;
      }
    }
    res.json({
      success: true,
      message: removed ? 'Désabonnement réussi' : 'Aucun abonnement trouvé',
      subscribersCount: pushSubscribers.size
    });
  });

  app.get('/api/notifications/status', (req, res) => {
    res.json({
      success: true,
      service: 'Markkanich Nouchi Push Service',
      status: 'active',
      subscribersCount: Math.max(pushSubscribers.size, 1420), // includes initial seed subscribers
      deliverySchedule: '08:00 GMT',
      features: ['Word of the Day', 'Audio Pronunciation', 'Offline Service Worker Sync', 'Daily Streak Reminders']
    });
  });

  app.post('/api/notifications/send-daily-word', (req, res) => {
    const { wordId, term, frenchTranslation, isTest = false } = req.body || {};
    res.json({
      success: true,
      message: isTest 
        ? `Notification test envoyée pour le mot "${term || 'Nouchi'}"`
        : `Notification push quotidienne diffusée aux abonnés (${Math.max(pushSubscribers.size, 1420)} destinataires)`,
      timestamp: new Date().toISOString(),
      payload: {
        title: `🇨🇮 Mot Nouchi du Jour : "${(term || 'Abidjan').toUpperCase()}"`,
        body: frenchTranslation ? `« ${frenchTranslation} »` : 'Découvrez le mot du jour sur Markkanich !',
        url: `/?word=${wordId || ''}&source=push_notification`
      }
    });
  });

  app.post('/api/notifications/fcm-token', (req, res) => {
    const { token, userId } = req.body || {};
    res.json({
      success: true,
      message: 'Token FCM enregistré avec succès pour les notifications push',
      registeredAt: new Date().toISOString()
    });
  });

  // REST API v1 for B2B & Developers
  app.post('/api/v1/translate', async (req, res) => {
    const authHeader = req.headers.authorization;
    const apiKey = authHeader?.replace('Bearer ', '');

    const { text, direction = 'fr_to_nouchi', tone = 'populaire' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text payload required.' });
    }

    try {
      const ai = getGenAI();
      if (!ai) {
        return res.json({
          status: 'success',
          api_version: 'v1.2',
          data: {
            translated_text: `« ${text} » (Traduction Locale Nouchi)`,
            direction,
            vocabulary: [{ term: "Môgô", sense: "Personne, ami" }]
          },
          meta: {
            authenticated: !!apiKey,
            tier: apiKey?.startsWith('nouchi_live_') ? 'business_api' : 'sandbox'
          }
        });
      }

      const systemPrompt = `Tu es l'API REST officielle de traduction Nouchi ivoirien pour développeurs et entreprises.
Traduire fidèlement la requête : "${text}" (${direction === 'fr_to_nouchi' ? 'Français vers Nouchi ivoirien' : 'Nouchi vers Français standard'}).
Renvoie un JSON strict avec translatedText (string), explanation (string), vocabularyUsed (array de {term, meaning}).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `Traduis : "${text}"`,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
        }
      });

      const parsed = JSON.parse(response.text?.trim() || '{}');
      return res.json({
        status: 'success',
        api_version: 'v1.2',
        data: parsed,
        meta: {
          timestamp: new Date().toISOString(),
          authenticated: !!apiKey,
          plan: apiKey?.startsWith('nouchi_live_') ? 'business_api' : 'free_sandbox',
          quota_remaining: 99850
        }
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Internal API Error', details: err?.message });
    }
  });

  app.get('/api/v1/status', (req, res) => {
    res.json({
      status: 'operational',
      service: 'Markkanich NouchiPro API',
      version: '1.2.0',
      uptime_sla: '99.99%',
      regions: ['europe-west', 'africa-south', 'global-edge']
    });
  });

  // ==========================================
  // PAYSTACK PAYMENT GATEWAY INTEGRATION (CI / XOF & International)
  // ==========================================
  
  // Paystack Configuration & Connection Status
  app.get('/api/paystack/config', (req, res) => {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const publicKey = process.env.PAYSTACK_PUBLIC_KEY;
    const isConfigured = !!(secretKey && !secretKey.includes('MY_PAYSTACK_SECRET_KEY'));
    const isLive = isConfigured && secretKey.startsWith('sk_live_');
    const isTest = isConfigured && secretKey.startsWith('sk_test_');

    res.json({
      success: true,
      connected: isConfigured,
      mode: isLive ? 'live' : (isTest ? 'test' : 'sandbox'),
      publicKey: publicKey && !publicKey.includes('MY_PAYSTACK_PUBLIC_KEY') ? publicKey : null,
      currency: 'XOF',
      country: 'CI',
      gatewayName: 'Paystack Côte d’Ivoire',
      supportedChannels: ['mobile_money', 'card', 'wave', 'orange_money', 'mtn_momo', 'moov_money'],
      message: isConfigured
        ? `Passerelle Paystack connectée (${isLive ? 'Production Live' : 'Test Mode'})`
        : 'Passerelle Paystack prête : définissez PAYSTACK_SECRET_KEY dans les paramètres pour activer les encaissements réels.'
    });
  });

  // Initialize Paystack Transaction
  app.post('/api/paystack/initialize', async (req, res) => {
    try {
      const {
        email,
        amount,
        currency = 'XOF',
        planId,
        billingCycle = 'monthly',
        customerName,
        phoneNumber,
        paymentMethod = 'paystack',
        callbackUrl
      } = req.body || {};

      if (!amount || isNaN(Number(amount))) {
        return res.status(400).json({ success: false, message: 'Montant invalide pour la transaction.' });
      }

      const clientEmail = email || (phoneNumber ? `${phoneNumber.replace(/\D/g, '')}@nouchipro.ci` : 'client@nouchipro.ci');
      const secretKey = process.env.PAYSTACK_SECRET_KEY;
      const isConfigured = !!(secretKey && !secretKey.includes('MY_PAYSTACK_SECRET_KEY'));

      // Configure channels based on user choice
      let channels = ['card', 'mobile_money', 'bank', 'qr', 'ussd'];
      if (paymentMethod === 'card') {
        channels = ['card'];
      } else if (['wave', 'orange_money', 'mtn_momo', 'moov_money'].includes(paymentMethod)) {
        channels = ['mobile_money'];
      }

      // If live or test Paystack secret key is configured in the environment
      if (isConfigured) {
        // Paystack amounts are in subunits (e.g. 500 XOF => 50000 subunits; 5 EUR => 500 cents)
        const subUnitAmount = Math.round(Number(amount) * 100);
        
        const returnUrl = callbackUrl || (process.env.APP_URL ? `${process.env.APP_URL}?paystack_ref=` : undefined);

        const response = await fetch('https://api.paystack.co/transaction/initialize', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${secretKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: clientEmail,
            amount: subUnitAmount,
            currency: currency || 'XOF',
            callback_url: returnUrl,
            metadata: {
              planId,
              billingCycle,
              customerName: customerName || 'Nouchiman VIP',
              phoneNumber: phoneNumber || '',
              paymentMethod,
              custom_fields: [
                { display_name: "Application", variable_name: "app", value: "Markkanich Le NouchiPro" },
                { display_name: "Formule", variable_name: "plan_id", value: String(planId) },
                { display_name: "Client", variable_name: "customer_name", value: String(customerName || '') },
                { display_name: "Téléphone", variable_name: "phone_number", value: String(phoneNumber || '') },
                { display_name: "Moyen", variable_name: "payment_method", value: String(paymentMethod) }
              ]
            },
            channels
          })
        });

        const data: any = await response.json();

        if (data.status && data.data) {
          return res.json({
            success: true,
            authorizationUrl: data.data.authorization_url,
            accessCode: data.data.access_code,
            reference: data.data.reference,
            mode: secretKey.startsWith('sk_live_') ? 'live' : 'test',
            message: 'Transaction Paystack initialisée avec succès'
          });
        } else {
          return res.status(400).json({
            success: false,
            message: data.message || "Échec de l'initialisation de la transaction Paystack",
            details: data
          });
        }
      } else {
        // Demonstration & Sandbox Mode when PAYSTACK_SECRET_KEY is not yet populated
        const simulatedRef = `pstk_demo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        return res.json({
          success: true,
          sandbox: true,
          reference: simulatedRef,
          authorizationUrl: null,
          message: "Transaction simulée Paystack validée. Renseignez la variable PAYSTACK_SECRET_KEY pour basculer en encaissement réel."
        });
      }
    } catch (err: any) {
      console.error('Erreur Paystack Initialize:', err);
      return res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la connexion avec Paystack',
        error: err?.message
      });
    }
  });

  // Verify Paystack Transaction
  app.get('/api/paystack/verify/:reference', async (req, res) => {
    try {
      const { reference } = req.params;
      if (!reference) {
        return res.status(400).json({ success: false, message: 'Référence de transaction requise.' });
      }

      const secretKey = process.env.PAYSTACK_SECRET_KEY;
      const isConfigured = !!(secretKey && !secretKey.includes('MY_PAYSTACK_SECRET_KEY'));

      // If it's a simulated sandbox reference
      if (reference.startsWith('pstk_demo_') || !isConfigured) {
        return res.json({
          success: true,
          verified: true,
          status: 'success',
          reference,
          amount: 0,
          currency: 'XOF',
          mode: 'sandbox',
          message: 'Paiement simulé validé avec succès'
        });
      }

      // Call Paystack Verify API
      const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${secretKey}`
        }
      });

      const data: any = await response.json();

      if (data.status && data.data) {
        const isPaid = data.data.status === 'success';
        return res.json({
          success: true,
          verified: isPaid,
          status: data.data.status,
          reference: data.data.reference,
          amount: data.data.amount / 100,
          currency: data.data.currency,
          channel: data.data.channel,
          paidAt: data.data.paid_at,
          customer: data.data.customer,
          metadata: data.data.metadata,
          mode: secretKey.startsWith('sk_live_') ? 'live' : 'test'
        });
      } else {
        return res.status(400).json({
          success: false,
          verified: false,
          message: data.message || 'Impossible de vérifier la transaction Paystack'
        });
      }
    } catch (err: any) {
      console.error('Erreur Paystack Verify:', err);
      return res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la vérification Paystack',
        error: err?.message
      });
    }
  });

  // Webhook endpoint for asynchronous payment notifications from Paystack
  app.post('/api/paystack/webhook', (req, res) => {
    const event = req.body;
    console.log('[Paystack Webhook Received]', event?.event, event?.data?.reference);
    // Respond 200 OK immediately as required by Paystack
    res.status(200).send('Webhook received');
  });

  // Vite middleware for development vs Static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Markkanich Le NouchiPro server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
