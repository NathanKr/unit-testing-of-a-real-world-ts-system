<h2>Exercise 11 **</h2>

<h3>Subject</h3> 
Configure the project to run on node server with a matching persist concrete class and unit test


<h3>Section 15 </h3>
Advanced typescript for better code

<h3>Your task</h3>
<ol>
<li>** Setup the task queue manager project to be tested the server</li>
<li>* Create server-file-persist.ts under exercises\11\final\src\lib with ServerFilePersist implements IPersistStorage and uses it in the code</li>
<li>Add unit test </li>
</ol>

<h3>Guidelines</h3>
<ol>
<li>Use vitest as test runner , vite is not required</li>
<li>Use the files in src directory of <a href='https://github.com/NathanKr/unit-testing-of-a-real-world-ts-system/releases/tag/0.83'>version 0.83</a> for the project</li>
<li>Exported persist should use ServerFilePersist </li>
<li>Update exercises\11\final\test\persistence.test.ts to fit ServerFilePersist</li>
</ol>
