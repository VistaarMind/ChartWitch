# Gemini Model Configuration Guide

## Free Tier Options from Google

Google offers several Gemini models with different free tier limits. Here are the best options that remain inside the **free** quota:

### Recommended Models (Free Tier)

1. **`gemini-1.5-flash-001`** ⭐ **RECOMMENDED** (Default)
   - **Free Tier**: 15 requests per minute (RPM), 1 million tokens per day
   - **Best for**: Fast responses, general use
   - **Cost**: Free tier is generous
   - **Why**: Official free-tier SKU that works with the Python SDK

2. **`gemini-1.5-flash`**
   - **Free Tier**: 15 RPM, 1 million tokens per day
   - **Best for**: Same use cases; available in most regions
   - **Cost**: Free tier
   - **Why**: Alternate identifier used by older SDK versions

3. **`models/gemini-1.5-flash`**
   - **Free Tier**: 15 RPM, 1 million tokens per day
   - **Best for**: Fallback when the SDK expects a fully qualified name
   - **Cost**: Free tier
   - **Why**: Ensures compatibility with different API versions

> 🔒 The application is now hard-wired to use only these free-tier models. It will try `gemini-1.5-flash-001` first, and automatically fall back to the other free variants if necessary.

## How to Change the Model

### Option 1: Environment Variable (Recommended)

Add this to your `.env` file: (only free models are supported)

```bash
# Preferred free model (default)
GEMINI_MODEL=gemini-1.5-flash-001

# Alternate free identifiers
GEMINI_MODEL=gemini-1.5-flash
GEMINI_MODEL=models/gemini-1.5-flash
```

### Option 2: Direct Code Change

The code now defaults to `gemini-1.5-flash-001`. If you want to change it permanently, edit `main.py`:

```python
GEMINI_MODEL = os.getenv('GEMINI_MODEL', 'gemini-1.5-flash-001')
```

## Free Tier Limits Comparison

| Model Identifier        | Requests/Min | Tokens/Day | Cost |
|-------------------------|-------------|------------|------|
| gemini-1.5-flash-001    | 15 RPM      | 1M tokens  | Free |
| gemini-1.5-flash        | 15 RPM      | 1M tokens  | Free |
| models/gemini-1.5-flash | 15 RPM      | 1M tokens  | Free |

> ⚠️ Paid models such as `gemini-1.5-pro` or `gemini-pro` are no longer used by default.

## Tips to Avoid 429 Errors

1. **Stay on the free-tier models listed above** – the code now enforces this.
2. **Use the built-in retry logic** – already implemented with exponential backoff.
3. **Throttle client-side calls if needed** – ensure users do not exceed 15 RPM.
4. **Monitor usage** – check Google Cloud Console for quota consumption.
5. **Queue or cache frequent requests** – reduce duplicate calls.

## Current Configuration

The code now:
- ✅ Defaults to `gemini-1.5-flash-001` (free tier)
- ✅ Automatically falls back to other free identifiers if necessary
- ✅ Retries on rate-limit errors with exponential backoff
- ✅ Rejects non-free models by design

## Next Steps

1. Optionally add `GEMINI_MODEL=gemini-1.5-flash-001` to your `.env` file.
2. Restart your application.
3. Monitor logs – you should see messages indicating the model in use.
4. Test the app – 500 errors related to missing models should be resolved.

## Alternative: Google AI Studio (Web Interface)

If you need a completely free web-based option for testing:
- Visit: https://aistudio.google.com/
- Free tier available
- Good for prototyping and testing prompts
- Not suitable for production API integration

## Need More Quota?

If you consistently hit free-tier limits:
1. Check Google Cloud Console quotas.
2. Request a quota increase (may require billing account).
3. Consider queueing or batching requests.
4. Upgrade to a paid tier only if necessary (not configured in this project).

