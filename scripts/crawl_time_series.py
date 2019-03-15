from alpha_vantage.timeseries import TimeSeries
ts = TimeSeries(key='DZHPXXR2H4LNPP84')

ts2 = TimeSeries(key="RY2YBGV16R3KE1XS")

import json
import time

f = open("time_series.json", "a")

# f.write("[\n")

symbols = ["HSBC","HSBCpA","HSNI","HTCCY","HTCKF","HWATY","HUIHY","HPIFY","HMI","K3FD.Singapore","HNP","HTHT","HUBOF","HUBG","7629.Luxembourg","HUBB","HUB.A","HUBS","HCBK","HUD","HPP","HUFAF","BOSSY","HUGPF","HOYFF","HUM","HDUGF","HUNT","HBAN","HII","HUN","HURC","HURN","HVLM","HUSKF","HSQVY","HNCMF","HCM","HUYA","HVBC","H","HRNNF","HYSNY","HY","HYHZF","HYUD.UK","HYUO.UK","HYUP.UK","HYUP2.Luxembourg","HYUP1.Luxembourg","HYUOR.Luxembourg","HYMLY","HYMTF","HYMLF","69521.Luxembourg","IIIV","IDLLF","IAC","IARSF","IBDRY","IBKC","IBIDF","IBWC","ICCGF","CDMGF","IEP","ICCH","ICFI","FCRDF","ICHR","IBN","ICTQ","ICNQU","ICLR","ICTG","ICUI","IDA","IIBK","IDKOF","IDKOY","IEX","IDXX","IDRSF","DSKY","IDWM","IEHC","IESC","IROQ","IFBH","IGIFF","RXDX","IGUEF","IHICF","INFO","0UAI.UK","IIVI","KANG","IKYCF","IILGV","ILG","ILIAF","ILII","ITW","ILMN","ILKAY","IMAX","IMDZF","IMYSF","IMIAY","IMIAF","IMMZF","IMMU","IPLD.UK","IMBBY","IMBBF","IMO","IMPV","PI","IMPR","IMS","HINA.UK","IHCPF","IOR","SAAS","INCY","IHC","IRT","IALB","INDB","IBCP","IBTX","IDTCF","IHFL.Luxembourg","INNG","PITPY","INDOY","INDHF","IDUSB.Luxembourg","IDEXY","IDEXF","IAFSF","IDCBY","IBKOR.Luxembourg","ILPT","INA.","IBA","IPOAF","IDDTF","IDTVF","IDDWF","IFCNF","IFNNY","IFNNF","INFSY","INFG","IPCC","IFRX","BLOX","IFJPY","IRMTF","INFY","HIFR","INGVF","ING","INGIY","INGIF","IR","NGVT","IMKTA","IM","INGR","IVTFF","INZZZ","IRC","ISTT","IMQCF","INGXF","INNYY","IPHS","IOSP","IIPR","INVA","INGN","98346.Luxembourg","INOV","IPHI","INRETC1.Peru"]

for s in symbols:
    try:
        data, meta_data = ts.get_intraday(s, interval='5min')
        f.write(json.dumps({"meta": meta_data, "data": data})+",\n")
        time.sleep( 20 )
        f.flush()
    except:
        print(s)
        time.sleep( 20 )
        continue

f.write("]\n")
f.close()


