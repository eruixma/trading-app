# Features

## Searching
The entire search solution is backed by Elasticsearch.

* Full text search
    - Match any text with stock metadata.
     
* Instant search
    - Use prefix query to match symbols, companies, and so on.
    
* Keyword search
    - User can specify which field to match by format "<keyword>:<value>"
    
* Compound search
   - User can compose multiple query with "AND".

* Sorting
    - User can sort stocks by specified field, e.g. order:MarketCap,desc

* Predefine search
    - User can click tiles in quotes page, to search by predefined search template

## Quotes

* Stock detail
    - price and change
    - finance information
    - intraday timeseries
    - daily time series for 3 months
    
* World indices
    - global finance market indecies
    - horizontal scroll

* Sector performance
    - show predefined sectors performance

## Portfolio

* Acount status
    - owned stock list
    - several account KPIs
    - account composition
    -compare with S&P 500


# Application Architecture

* Frontend
    -React & Redux
    
* Backend
    - Flask

* Search
    - Elasticsearch
    
* Database
    - Sqllite
    

* Flow chart

                                                                    +-------------------+
                                                                    |                   |
                                                         +---------->     Elasticsearch |
        +------------------+    Restful  +------------------+       |                   |
        |                  |             |                  |       +-------------------+
        |   browser        +------------->    flask         |
        |                  |             |                  |
        +------------------+             +-------+-------+--+       +------------------+
                                                 |       |          |                  |
                                                 |       +---------->     Sqllite      |
                                                 |                  |                  |
                                                 |                  +------------------+
                                                 |
                                        +--------v--------------+
                                        |                       |
                                        |      Internet         |
                                        |                       |
                                        |                       |
                                        +-----------------------+



