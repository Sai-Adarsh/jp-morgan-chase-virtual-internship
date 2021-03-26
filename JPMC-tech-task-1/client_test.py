import unittest
from client3 import getDataPoint,getRatio

class ClientTest(unittest.TestCase):
  def test_getDataPoint_calculatePrice(self):
    quotes = [
      {'top_ask': {'price': 121.2, 'size': 36}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 120.48, 'size': 109}, 'id': '0.109974697771', 'stock': 'ABC'},
      {'top_ask': {'price': 121.68, 'size': 4}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 117.87, 'size': 81}, 'id': '0.109974697771', 'stock': 'DEF'}
    ]
    """ ------------ Add the assertion below ------------ """
    for quote in quotes:
      self.assertEqual(getDataPoint(quote), (quote['stock'], quote['top_bid']['price'],quote['top_ask']['price'], (quote['top_bid']['price'] + quote['top_ask']['price']) / 2 ))

  def test_getDataPoint_calculatePriceBidGreaterThanAsk(self):
    quotes = [
      {'top_ask': {'price': 119.2, 'size': 36}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 120.48, 'size': 109}, 'id': '0.109974697771', 'stock': 'ABC'},
      {'top_ask': {'price': 121.68, 'size': 4}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 117.87, 'size': 81}, 'id': '0.109974697771', 'stock': 'DEF'}
    ]
    """ ------------ Add the assertion below ------------ """
    for quote in quotes:
      self.assertEqual(getDataPoint(quote), (quote['stock'], quote['top_bid']['price'],quote['top_ask']['price'], (quote['top_bid']['price'] + quote['top_ask']['price']) / 2 ))

  """ ------------ Add more unit tests ------------ """
    def test_priceAzeroRatio(self):
      price_a = 0
      price_b = 169.69
      self.assertEqual(getRatio(price_a,price_b), 0) # If return val !=0, testcase fails

    def test_priceBzeroRatio(self):
      price_a = 121.2
      price_b = 0
      self.assertIsNone(getRatio(price_a,price_b)) 

    def ratioGreaterthan1(self):
      price_a = 352.69
      price_b = 167.32
      self.assertGreater(getRatio(price_a,price_b), 1) # Ratio should be greater than 1

      def ratioEqualto1(self):
      price_a = 352.69
      price_b = 352.69
      self.assertGreater(getRatio(price_a,price_b), 1) # Ratio should be equal than 1

      def ratioGreaterthan1(self):
      price_a = 169.96
      price_b = 369.69
      self.assertGreater(getRatio(price_a,price_b), 1) # Ratio should be lesser than 1

# I added these 5 unit tests after looking at the Model made by JPMorgan

if __name__ == '__main__':
    unittest.main()
