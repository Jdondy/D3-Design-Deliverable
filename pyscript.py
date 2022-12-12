import pandas as pd
import numpy as np
import calendar

ny = pd.read_csv("./KNYC.csv")
wa = pd.read_csv("./KSEA.csv")
tx = pd.read_csv("./KHOU.csv")

ny['state'] = "ny"
wa['state'] = 'wa'
tx['state'] = 'tx'

weatherFrames = [ny, wa, tx]
weatherData = pd.concat(weatherFrames)
weatherData = weatherData.dropna(subset=['date'])
weatherData['date'] = pd.to_datetime(weatherData['date'])
monthlyData = weatherData.groupby(weatherData.date.dt.month)['average_precipitation'].sum()
monthlyData = pd.DataFrame(monthlyData)
print(monthlyData.head())
monthlyData = monthlyData.assign(month = range(1,13))
monthlyData["month"] = monthlyData["month"].apply(lambda x: calendar.month_name[x])
monthlyData.to_csv( r"C:\Users\dondy\Desktop\474\final-project-Jdondy\monthlyData.csv", index=False, header=True)
weatherData.to_csv( r"C:\Users\dondy\Desktop\474\final-project-Jdondy\weatherData.csv", index=False, header=True)
print(weatherData.head());

print("min",weatherData.min())
print("max", weatherData.max())




