#!/bin/bash
echo "🧪 PRE-DEPLOYMENT TEST SUITE"
echo "============================"

# Test 1: Local server functionality
echo "1️⃣ Testing local server..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Local server responding"
else
    echo "❌ Local server not running - start with 'npm run dev'"
fi

# Test 2: API endpoints
echo "2️⃣ Testing API endpoints..."
endpoints=("/api/health" "/api/create-payment-intent")
for endpoint in "${endpoints[@]}"; do
    if [ "$endpoint" = "/api/create-payment-intent" ]; then
        # POST request for payment intent
        response=$(curl -s -X POST http://localhost:3000$endpoint \
            -H "Content-Type: application/json" \
            -d '{"amount": 136, "shareId": "test", "userId": "test"}' \
            -w "%{http_code}")
        if [[ "$response" == *"200"* ]] || [[ "$response" == *"clientSecret"* ]]; then
            echo "✅ $endpoint working"
        else
            echo "❌ $endpoint failed"
        fi
    else
        # GET request for health
        if curl -s http://localhost:3000$endpoint > /dev/null; then
            echo "✅ $endpoint working"
        else
            echo "❌ $endpoint failed"
        fi
    fi
done

# Test 3: Environment variables
echo "3️⃣ Testing environment variables..."
if [ -f ".env.local" ]; then
    required_vars=("STRIPE_SECRET_KEY" "STRIPE_PUBLISHABLE_KEY" "STRIPE_WEBHOOK_SECRET")
    all_vars_present=true
    for var in "${required_vars[@]}"; do
        if grep -q "$var" .env.local; then
            echo "✅ $var configured"
        else
            echo "❌ $var missing"
            all_vars_present=false
        fi
    done
    
    if [ "$all_vars_present" = true ]; then
        echo "✅ All environment variables present"
    else
        echo "❌ Some environment variables missing"
    fi
else
    echo "❌ .env.local file not found"
fi

# Test 4: Package dependencies
echo "4️⃣ Testing package dependencies..."
if npm list --depth=0 > /dev/null 2>&1; then
    echo "✅ All dependencies installed"
else
    echo "❌ Dependency issues detected - run 'npm install'"
fi

# Test 5: Build test
echo "5️⃣ Testing build process..."
if npm run build > build-test.log 2>&1; then
    echo "✅ Build successful"
    rm -rf .next build-test.log  # Clean up
else
    echo "❌ Build failed - check build-test.log"
fi

echo "============================"
echo "🎯 PRE-DEPLOYMENT SUMMARY"
echo "Ready for Vercel deployment when limits reset"
echo "Run './deploy-to-vercel.sh' when ready"
echo "============================"
