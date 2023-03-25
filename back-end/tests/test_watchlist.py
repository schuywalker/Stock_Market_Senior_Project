import unittest
from services.watchlist import WatchlistService

# run with python3 -m unittest tests/test_watchlist.py
# TEST SERVICES (not routes or anything dealing with network calls)

class Test_parseFinancials(unittest.TestCase):
    def test_insufficient_fields(self):
        with self.assertRaises(AttributeError):
            WatchlistService.parseBasicFinancials(None)



if __name__ == '__main__':
    unittest.main(verbosity=2)