from bs4 import BeautifulSoup
import csv
import urllib2
import re

#I'm so sorry for this:
urls = [
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3127&topicgroupid=9634&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3128&topicgroupid=9636&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3129&topicgroupid=9638&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3130&topicgroupid=9639&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3131&topicgroupid=9642&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3132&topicgroupid=9643&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3133&topicgroupid=9645&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3135&topicgroupid=9650&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3136&topicgroupid=9653&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3136&topicgroupid=9652&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3137&topicgroupid=9655&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3137&topicgroupid=9656&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3138&topicgroupid=9658&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3139&topicgroupid=9660&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3142&topicgroupid=9666&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3143&topicgroupid=9668&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3144&topicgroupid=9670&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3145&topicgroupid=9672&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3146&topicgroupid=9674&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3147&topicgroupid=9676&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3148&topicgroupid=9678&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3150&topicgroupid=9682&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3172&topicgroupid=9745&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3153&topicgroupid=9700&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3154&topicgroupid=9702&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3141&topicgroupid=9664&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3159&topicgroupid=9718&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3160&topicgroupid=9720&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3161&topicgroupid=9723&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3162&topicgroupid=9725&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3163&topicgroupid=9727&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3164&topicgroupid=9729&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3165&topicgroupid=9731&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3166&topicgroupid=9733&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3167&topicgroupid=9735&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3167&topicgroupid=9735&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3167&topicgroupid=9735&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3170&topicgroupid=9741&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3171&topicgroupid=9743&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3151&topicgroupid=9686&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3151&topicgroupid=9689&loaduseredits=True",
    "http://navigator.lakeheadu.ca/Catalog/ViewCatalog.aspx?pageid=viewcatalog&catalogid=20&chapterid=3151&topicgroupid=9690&loaduseredits=True"
    ]
#end of apology


#Use the following dictionary to convert from 'Computer Science' (which is returned from LU website) to COMP
programs = {
    "Anthropology":"ANTH",
    "Applied Bio-Molecular Science":"APBI",
    "Bioinformatics":"BIOI",
    "Biology":"BIOL",
    "Business":"BUSI",
    "Chemistry":"CHEM",
    "Computer Science":"COMP",
    "Criminology":"CRIM",
    "Economics":"ECON",
    "Education":"EDUC",
    "Engineering":"ENGI",
    "English":"ENGL",
    "Environmental Studies":"ENST",
    "General Science":"GSCI",
    "Geoarchaeology":"GEOA",
    "Geography":"GEOG",
    "Geography ":"GEOG",
    "Geology":"GEOL",
    "Gerontology":"GERO",
    "History":"HIST",
    "Indigenous Learning":"INDI",
    "Kinesiology":"KINE",
    "Languages":"LANG",
    "Law":"LAWS",
    "Library and Information Studies":"LIBR",
    "Library & Information Studies":"LIBR",
    "Mathematics":"MATH",
    "Medicine":"MEDS",
    "Music":"MUSI",
    "Native Access":"NACC",
    "Natural Resources Management":"NRMT",
    "Northern Studies":"NORT",
    "Nursing":"NURS",
    "Outdoor Recreation":"OUTD",
    "Philosophy":"PHIL",
    "Physics":"PHYS",
    "Political Science":"POLI",
    "Psychology":"PSYC",
    "Religious Studies":"RELI",
    "Social Work":"SOWK",
    "Sociology":"SOCI",
    "Visual Arts":"VISU",
    "Water Resource Science":"WATE",
    "Women's Studies":"WOME",
    "French":"FREN"
    }#YIKES #badcoder #twitterWithPython

with open('LUCourses.csv', 'wb') as csvfile:
    for url in urls:
        print "Working on..." + url
        #generate csv writer
        writer = csv.writer(csvfile, delimiter = ',', quotechar = '"', quoting = csv.QUOTE_MINIMAL)
        
        #grab html from url.
        response = urllib2.urlopen(url)
        html = response.read()

        soup = BeautifulSoup(html, 'html.parser')
    
        #pull HTML for course code, title and info:
        CourseCodeHTML = soup.findAll("span", { "class" : "course-code" })
        CourseTitleHTML = soup.findAll("span", { "class" : "course-title"})
        CourseInfoHTML = soup.findAll("div", { "class" : "course-details-body"})

        #Initialize lists to hold csv info:
        CourseDescs = []
        CourseCredits = []
        CoursePrereqs = []
        CourseCodes = []
        CourseTitles = []

        DepartmentCodes = []
        
        #parse course information (description, credits, requirements)
        for course in CourseInfoHTML:
            parsedCourse = course.findAll("span", { "class" : "course-value" }) #grabs all course data
            #grabs course data (if it exists), if course description doesn't exist, replaces with none.
            #if there isn't atleast 3 elements, it produces an error (can be improved upon)
            if len(parsedCourse) > 2:
                if (parsedCourse[0].text == '0.5' or parsedCourse[0].text == '1.0'):
                    CourseDescs.append('none')    
                    CourseCredits.append(parsedCourse[0].text)
                    if not(parsedCourse[1].text[0].isdigit()): #if the first character is not a number:
                        CoursePrereqs.append(parsedCourse[1].text)
                    else:
                        CoursePrereqs.append('none')
                else:
                    CourseDescs.append(parsedCourse[0].text)
                    CourseCredits.append(parsedCourse[1].text)
                    if not(parsedCourse[2].text[0].isdigit()): #if the first character is not a number:
                        CoursePrereqs.append(parsedCourse[2].text)
                    else:
                        CoursePrereqs.append('none')
            else:
                CourseDescs.append('error')
                CourseCredits.append('0')
                CoursePrereqs.append('error')

        
        #parse course codes (e.g. Computer Science 1411)
        for course in CourseCodeHTML:
            CourseCodes.append(course.text[-4:])
            DepartmentCodes.append(programs[course.text[:-5]])
                     
        #parse course Title (e.g. Programming I)
        for course in CourseTitleHTML:
            CourseTitles.append(course.text)
            
        #write the data to a csv row.
        for i in range(0,len(CourseCodes)):
            #replace commas with | for delimiter reasons!
            CourseDescs[i] = CourseDescs[i].replace(',', '|')
            writer.writerow([DepartmentCodes[i].encode('utf-8')] + [CourseCodes[i].encode('utf-8')] + [CourseTitles[i].encode('utf-8')] + [CourseDescs[i].encode('utf-8')] + [CourseCredits[i].encode('utf-8')] + [CoursePrereqs[i].encode('utf-8')])



    
