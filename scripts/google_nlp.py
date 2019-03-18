# Imports the Google Cloud client library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

# Instantiates a client
client = language.LanguageServiceClient()

# The text to analyze
text = u'2U Inc is engaged in providing cloud-based software-as-a-service platform. Its platform enables nonprofit colleges and universities to deliver education to qualified students anywhere.2U Inc enables colleges and universities to bring their degree programs online. Its solutions are delivered on a cloud-based software-as-a-service platform, which enables clients to reach students globally. The firm\'s flagship online learning environment application, Online Campus, delivers content in a virtual live class setting and facilitates social networking between students. Solutions include content development, student acquisition, application monitoring, and other capabilities. The firm generates revenue through subscription fees to software offerings on a 10- to 15-year basis. A large majority of the firm\'s revenue is generated in the United States.HSBC is one of the biggest banks of the world'
document = types.Document(
    content=text,
    type=enums.Document.Type.PLAIN_TEXT)

# Detects the sentiment of the text
# sentiment = client.analyze_sentiment(document=document).document_sentiment
response = client.classify_text(document=document)
for category in response.categories:
    print('=' * 20)
    print('         name: {0}'.format(category.name))
    print('         confidence: {0}'.format(category.confidence))
print('Text: {}'.format(text))
# print('Sentiment: {}, {}'.format(sentiment.score, sentiment.magnitude))

