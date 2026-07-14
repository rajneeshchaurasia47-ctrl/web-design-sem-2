import sys

# वित्तीय डेटाबेस (अब और भी विस्तृत)
financial_knowledge_base = {
    "hello": "नमस्ते! मैं आपकी वित्तीय सहायता के लिए यहाँ हूँ। मैं आपको शेयर बाजार, ब्याज दरों, टैक्स और निवेश के बारे में बुनियादी जानकारी दे सकता हूँ।",
    "hi": "नमस्ते! आप किस वित्तीय विषय पर जानना चाहते हैं?",
    
    # पुराने कीवर्ड्स
    "sbi share price": "नोट: मैं एक प्रोटोटाइप हूँ और लाइव डेटा नहीं दे सकता। वर्तमान में SBI का शेयर भाव देखने के लिए कृपया NSE या BSE की आधिकारिक वेबसाइट चेक करें।",
    "mutual fund": "म्युचुअल फंड एक निवेश उपकरण है जहाँ कई निवेशकों का पैसा जमा करके प्रोफेशनल मैनेजर स्टॉक्स और बॉन्ड्स में निवेश करते हैं।",
    "stock market": "शेयर बाजार वह जगह है जहाँ कंपनियों के शेयर खरीदे और बेचे जाते हैं। यह निवेशकों और कंपनियों के बीच लेन-देन करता है।",
    "interest rate": "भारत में रेपो रेट (Repo Rate) रिजर्व बैंक ऑफ इंडिया (RBI) द्वारा तय की जाती है। यह बैंकों के लिए उधार लेने की दर है।",
    
    # नए कीवर्ड्स जोड़े गए
    "pme": "पर्सनल फाइनेंस या PME का मतलब है निजी वित्त प्रबंधन। इसमें अपने आय और व्यय को नियंत्रित करना, बचत करना और निवेश करना शामिल है।",
    "taxation": "टैक्सेशन का अर्थ है सरकार द्वारा आय पर लगाया गया कर। भारत में व्यक्तिगत आयकर (Income Tax) आय के स्तर के आधार पर लगाया जाता है।",
    "inflation": "महंगाई (Inflation) वह स्थिति है जब सामान्य वस्तुओं और सेवाओं की कीमतें समय के साथ बढ़ती हैं, जिससे मुद्रा की खरीददारी कम होती है।",
    "fixed deposit": "फिक्स्ड डिपॉजिट (FD) एक निवेश विधि है जहाँ आप बैंक में एक निश्चित अवधि के लिए पैसा जमा करते हैं और उसे एक निर्धारित ब्याज दर पर वापस पाते हैं।",
    "fd rate": "वर्तमान में बैंक FD दरें 6% से 8% के बीच हो सकती हैं, लेकिन यह बैंक और अवधि पर निर्भर करती है। सटीक जानकारी के लिए अपने बैंक से संपर्क करें।",
    "default": "मैं इस प्रश्न का जवाब नहीं दे सकता। कृपया 'शेयर बाजार', 'म्युचुअल फंड', 'टैक्स', 'महंगाई', 'FD', 'SBI' या 'PME' जैसे शब्दों के साथ पूछें।"
}

def chatbot_response(user_input):
    clean_input = user_input.lower().strip()
    
    # कीवर्ड मैचिंग (अब और भी लचीला)
    if "hello" in clean_input or "hi" in clean_input:
        return financial_knowledge_base["hello"]
    elif "sbi" in clean_input and ("price" in clean_input or "share" in clean_input):
        return financial_knowledge_base["sbi share price"]
    elif "mutual fund" in clean_input:
        return financial_knowledge_base["mutual fund"]
    elif "stock market" in clean_input or "share market" in clean_input:
        return financial_knowledge_base["stock market"]
    elif "interest" in clean_input or "rate" in clean_input:
        return financial_knowledge_base["interest rate"]
    elif "pme" in clean_input or "personal finance" in clean_input:
        return financial_knowledge_base["pme"]
    elif "tax" in clean_input or "taxation" in clean_input:
        return financial_knowledge_base["taxation"]
    elif "inflation" in clean_input or "mehangai" in clean_input:
        return financial_knowledge_base["inflation"]
    elif "fixed deposit" in clean_input or "fd" in clean_input:
        if "rate" in clean_input:
            return financial_knowledge_base["fd rate"]
        return financial_knowledge_base["fixed deposit"]
    else:
        return financial_knowledge_base["default"]

def main():
    print("=== वित्तीय चैटबोट प्रोटोटाइप (अपडेटेड) ===")
    print("प्रश्न पूछें या 'exit' लिखकर बाहर निकलें।")
    print("सहायक कीवर्ड्स: hello, sbi share, mutual fund, stock market, interest, pme, tax, inflation, fd")
    print("-" * 40)
    
    while True:
        try:
            user_input = input("आप: ")
            
            if user_input.lower() == "exit":
                print("चैटबोट: धन्यवाद! फिर मिलेंगे।")
                break
            
            response = chatbot_response(user_input)
            print(f"बॉट: {response}")
            
        except KeyboardInterrupt:
            print("\nचैटबोट: बाहर निकल रहे हैं...")
            break
        except Exception as e:
            print(f"चैटबोट: त्रुटि हुई - {e}")

if __name__ == "__main__":
    main()