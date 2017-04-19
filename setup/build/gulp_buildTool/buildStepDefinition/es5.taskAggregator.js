const GulpTaskDependency = [
    {
        name: 'install:dependencies',
        executionType: 'parallel',
        childTask: [
            {
                label: 'npm'
            }, 
            {
                label: 'jspm'
            },
            {
                label: 'bower'
            },
        ]
    },
    {
        name: 'copy:sourceToDistribution',
        executionType: 'parallel',
        childTask: [
            {
                label: 'serverSide'
            },
            {
                label: 'clientSide'
            },
        ]
    },
    {
        name: 'buildSourceCode',
        executionType: 'parallel',
        childTask: [
            {
                label: 'json'
            },
            {
                label: 'html:metadata'
            },
            {
                label: 'html:root'
            },
            {
                label: 'html:webcomponent'
            },
            {
                label: 'html:polymer'
            },
            // {
            //     label: 'html:template'
            // },
            {
                label: 'stylesheet:css'
            },
            {
                label: 'javascript:js'
            },
            {
                label: 'javascript:serverSide'
            },
        ]
    },
    {
        name: 'symlink',
        executionType: 'parallel',
        childTask: [
            {
                label: 'nodeModules'
            },
        ]
    },
    {
        name: 'build',
        executionType: 'series',
        childTask: [
            {
                label: 'install:dependencies'
            },
            {
                label: 'copy:sourceToDistribution'
            },
            {
                label: 'buildSourceCode'
            },
            // {
            //     label: 'symlink'
            // },
        ]
    },
]

module.exports = GulpTaskDependency