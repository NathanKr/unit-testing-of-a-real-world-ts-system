<h2>Exercise 2</h2>

<h3>Subject</h3> 
Unit test of pure logic module - grade-calculator.ts  

<h3>Section 4 </h3>
Unit test of pure logic code - TaskQueue

<h3>Your task</h3>
<ol>
<li>move test directory from exercises\2\final\src\test to exercises\2\final\test and fix tests to pass</li>
<li>
unit test the functions of the module grade-calculator.ts :
<ul>
<li>parseCSV</li>
<li>* calculateAverage</li>
</ul>
</li>
</ol>

<h3>Guidelines</h3>
<ol>
<li>Create a file grade-calculator.test.ts under exercises\2\final\test</li>
<li>parseCSV read grades from a string that has the content of a CSV file as in exercises\2\final\data\grades.csv</li>
<li>parseCSV has a bug; your test should find it, i.e., create a test that will fail when the bug exists and pass when the bug is fixed</li>
<li>toBe will not be good for parseCSV - you need to find a better matcher</li>
</ol>
